import { types, applySnapshot } from 'mobx-state-tree';
import { Card, CardModelSnapshotType, CardModelType } from './Card';
import { Map } from 'immutable';
import { BasicCardEffect, GainedCard } from '../types/cardEffect.types';
import { generateCardDescription } from '../utils/cardGenerator';

export enum CardLibraryOperationKind {
  Success = 'Success',
  Error = 'Error',
}

export type CardLibraryOperation = {
  kind: CardLibraryOperationKind;
  text: string;
};

enum CardValidationStatusKind {
  Valid = 'Valid',
  Invalid = 'Invalid',
}

type CardValidationStatus = {
  kind: CardValidationStatusKind;
  text: string;
};

type ValidateCardParams = {
  card: CardModelType | CardModelSnapshotType;
  targetId: string;
};

enum CardSortMode {
  AlphaASC = 'Alphabetical Ascending',
  AlphaDESC = 'Alphabetical Descending',
}

export const CardLibrary = types
  .model('CardLibrary', {
    cards: types.optional(types.array(Card), []),
    cardFilter: types.optional(
      types.model('CardFilter', {
        sortMode: types.optional(
          types.enumeration(
            'CardSortMode',
            Object.keys(CardSortMode).map(key => CardSortMode[key])
          ),
          CardSortMode.AlphaASC
        ),
        filterText: types.optional(types.string, ''),
      }),
      { sortMode: CardSortMode.AlphaASC, filterText: '' }
    ),
  })
  .views(self => ({
    /** Returns a map of the card library. Uses the card id as the key and the card view data as the value. */
    get cardLibraryJson() {
      return JSON.stringify(
        Map(self.cards.map(_ => [_.id, _.viewData])).toObject(),
        undefined,
        2
      );
    },
    getCardById(id: string): CardModelType {
      return self.cards.find(_ => _.id === id);
    },
    get sortedCards() {
      // TODO: Check sort type and filtering
      return self.cards.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
  }))
  .actions(self => {
    function updateCard(
      id: string,
      snapshot: CardModelSnapshotType
    ): CardLibraryOperation {
      // Find the card to be updated
      const cardToUpdate = self.getCardById(id);
      const validationStatus = validateCard({
        // Validate the snapshot
        card: snapshot,
        // If the id was changed in the snapshot, check that there isn't a card with the same id as the snapshot
        targetId: id !== snapshot.id ? snapshot.id : '',
      });

      if (
        cardToUpdate &&
        validationStatus.kind === CardValidationStatusKind.Valid
      ) {
        updateReferencedCardEffects(
          { id: cardToUpdate.id, name: cardToUpdate.name },
          { id: snapshot.id, name: snapshot.name }
        );
        applySnapshot(cardToUpdate, snapshot);
        return {
          kind: CardLibraryOperationKind.Success,
          text: `Success! ${
            snapshot.name
          } has been updated in the card library.`,
        };
      } else {
        return {
          kind: CardLibraryOperationKind.Error,
          text: validationStatus.text,
        };
      }
    }

    function addCard(card: CardModelType): CardLibraryOperation {
      const validationStatus = validateCard({ card, targetId: card.id });
      if (validationStatus.kind === CardValidationStatusKind.Valid) {
        self.cards.push(card);
        return {
          kind: CardLibraryOperationKind.Success,
          text: `Success! ${card.name} has been added to the card library.`,
        };
      } else {
        return {
          kind: CardLibraryOperationKind.Error,
          text: validationStatus.text,
        };
      }
    }

    function deleteCard(id: string): CardLibraryOperation {
      const validationStatus = validateDeletedCard(id);
      if (validationStatus.kind === CardValidationStatusKind.Valid) {
        self.cards.remove(self.getCardById(id));
        return {
          kind: CardLibraryOperationKind.Success,
          text: '',
        };
      } else {
        return {
          kind: CardLibraryOperationKind.Error,
          text: validationStatus.text,
        };
      }
    }

    function validateCard({
      card,
      targetId,
    }: ValidateCardParams): CardValidationStatus {
      // Check to see if there is another card in the library with the same id
      if (targetId && self.getCardById(targetId)) {
        return {
          kind: CardValidationStatusKind.Invalid,
          text:
            'There is another card in the library with the same id. Please use another name.',
        };
      }

      // Check for an empty id or name
      if (card.id === '' || card.name === '') {
        return {
          kind: CardValidationStatusKind.Invalid,
          text:
            'Error! The card id and name must not be empty. Please change the card name.',
        };
      }

      return { kind: CardValidationStatusKind.Valid, text: '' };
    }

    /** Given a card id, validate whether or not we can delete the card. */
    function validateDeletedCard(id: string): CardValidationStatus {
      const deletedCard = self.cards.find(_ => _.id === id);
      if (!deletedCard) {
        return {
          kind: CardValidationStatusKind.Invalid,
          text:
            'Error! Card deletion was unsuccessful because it does not exist in the card library.',
        };
      }

      // Find if the deleted card is being referenced by another card's effects
      const referencedCards = self.cards
        .filter(
          _ =>
            !!_.effectsList.find(
              (effect: BasicCardEffect) =>
                (effect.gainedCard &&
                  effect.gainedCard.id === deletedCard.id) ||
                false
            )
        )
        .map(_ => {
          return _.name;
        })
        .join(', ');

      if (referencedCards) {
        return {
          kind: CardValidationStatusKind.Invalid,
          text: `Error! Unable to delete ${
            deletedCard.name
          }, it is still referenced by the following
            card${referencedCards.length > 1 ? 's' : ''}: ${referencedCards}.`,
        };
      }

      return { kind: CardValidationStatusKind.Valid, text: '' };
    }

    /** Find all cards with references to the old card id/name, and replace the references with the new card id/name. */
    function updateReferencedCardEffects(
      oldRef: GainedCard,
      newRef: GainedCard
    ) {
      self.cards
        .filter(
          _ =>
            !!_.effectsList.find(
              (effect: BasicCardEffect) =>
                (effect.gainedCard && effect.gainedCard.id === oldRef.id) ||
                false
            )
        )
        .forEach((_: CardModelSnapshotType) => {
          const updatedEffects = _.effects.map((effect: BasicCardEffect) => {
            return effect.gainedCard && effect.gainedCard.id === oldRef.id
              ? {
                  ...effect,
                  gainedCard: { id: newRef.id, name: newRef.name },
                }
              : effect;
          });
          updateCard(_.id, {
            ..._,
            effects: updatedEffects,
            description: generateCardDescription(_.kind, updatedEffects),
          });
        });
    }

    return {
      updateCard,
      addCard,
      deleteCard,
    };
  });

export type CardLibraryModelType = typeof CardLibrary.Type;
