import { types, applySnapshot } from 'mobx-state-tree';
import { Card, CardModelSnapshotType, CardModelType } from './Card';
import { Map } from 'immutable';

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

export const CardLibrary = types
  .model('CardLibrary', {
    cards: types.optional(types.array(Card), []),
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
  }))
  .actions(self => {
    function updateCard(
      id: string,
      snapshot: CardModelSnapshotType
    ): CardLibraryOperation {
      // Find the card to be updated
      const cardToUpdate = self.getCardById(id);
      const cardValidationStatus = validateCard({
        // Validate the snapshot
        card: snapshot,
        // If the id was changed in the snapshot, check that there isn't a card with the same id as the snapshot
        targetId: id !== snapshot.id ? snapshot.id : '',
      });

      if (
        cardToUpdate &&
        cardValidationStatus.kind === CardValidationStatusKind.Valid
      ) {
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
          text: cardValidationStatus.text,
        };
      }
    }

    function addCard(card: CardModelType): CardLibraryOperation {
      const cardValidationStatus = validateCard({ card, targetId: card.id });
      if (cardValidationStatus.kind === CardValidationStatusKind.Valid) {
        self.cards.push(card);
        return {
          kind: CardLibraryOperationKind.Success,
          text: `Success! ${card.name} has been added to the card library.`,
        };
      } else {
        return {
          kind: CardLibraryOperationKind.Error,
          text: cardValidationStatus.text,
        };
      }
    }

    function deleteCard(id: string) {
      const deletedCard = self.cards.find(_ => _.id === id);
      if (deletedCard) {
        self.cards.remove(deletedCard);
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

    return {
      updateCard,
      addCard,
      deleteCard,
      validateCard,
    };
  });

export type CardLibraryModelType = typeof CardLibrary.Type;
