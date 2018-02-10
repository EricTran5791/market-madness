import { types } from 'mobx-state-tree';
import {
  CardEffectUnion,
  CardEffectKind,
  BasicCardEffectSnapshotType,
  CardEffectCategory,
  InteractiveCardEffectSnapshotType,
  InteractiveCardEffectCategory,
} from './CardEffect';

export enum CardCategory {
  Action = 'Action',
  Consumable = 'Consumable',
  Item = 'Item',
  Money = 'Money',
  NPC = 'NPC',
}

export enum CardSubcategory {
  Food = 'Food',
}

export const Card = types
  .model({
    id: types.identifier(types.string),
    name: types.string,
    category: types.enumeration(
      'Category',
      Object.keys(CardCategory).map(key => CardCategory[key])
    ),
    subcategories: types.optional(
      types.array(
        types.enumeration(
          'Subcategory',
          Object.keys(CardSubcategory).map(key => CardSubcategory[key])
        )
      ),
      []
    ),
    description: types.optional(types.string, ''),
    cost: types.optional(types.number, 0),
    money: types.optional(types.number, 0),
    health: types.optional(types.number, 0),
    isPlayed: types.optional(types.boolean, false),
    effects: types.optional(types.array(CardEffectUnion), []),
  })
  .actions(self => ({
    afterCreate() {
      if (self.description.length > 0 || self.effects.length === 0) {
        return;
      }

      // Auto generate descriptions
      if (self.category === CardCategory.NPC) {
        self.description = 'Defeat: ';
      }
      self.description += self.effects
        .map(effect => {
          if (effect.kind === CardEffectKind.Basic) {
            const {
              category,
              value,
              gainedCardId,
            }: BasicCardEffectSnapshotType = effect;
            switch (category) {
              case CardEffectCategory.Draw:
                return `Draw ${value} card${value > 1 ? 's' : ''}`;
              case CardEffectCategory.GainAttack:
                return `+${value} Attack`;
              case CardEffectCategory.GainCardToDiscardPile:
                // The RegEx converts the camel case id to a spaced and capitalized name
                // TODO: There was a circular dependency when cardGenerator was imported
                // due to cardLibrary also importing CardCategory from Card
                return `Gain ${value} ${gainedCardId
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str: string) => {
                    return str.toUpperCase();
                  })}`;
              case CardEffectCategory.GainCardToHand:
                // The RegEx converts the camel case id to a spaced and capitalized name
                // TODO: There was a circular dependency when cardGenerator was imported
                // due to cardLibrary also importing CardCategory from Card
                return `Add ${value} ${gainedCardId
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str: string) => {
                    return str.toUpperCase();
                  })} to your hand`;
              case CardEffectCategory.GainMoney:
                return `+${value} Money`;
              case CardEffectCategory.Heal:
                return `Heal ${value}`;
              case CardEffectCategory.IncreaseMaxHealth:
                return `Increase max health by ${value}`;
              case CardEffectCategory.TrashSelf:
                return `Trash this card`;
              default:
                return '';
            }
          }
          if (effect.kind === CardEffectKind.Interactive) {
            const {
              category,
              numCardsToResolve,
            }: InteractiveCardEffectSnapshotType = effect;
            switch (category) {
              case InteractiveCardEffectCategory.OptionalTrash:
                return `Trash up to ${numCardsToResolve} cards`;
              case InteractiveCardEffectCategory.MandatoryDiscard:
                return `Discard ${numCardsToResolve} cards`;
              case InteractiveCardEffectCategory.MandatoryTrash:
                return `Trash ${numCardsToResolve} cards`;
              default:
                return '';
            }
          }
          return '';
        })
        .join(', ');
    },
    /** Reset a card's isPlayed status every time it is detached from its direct parent. */
    beforeDetach() {
      self.isPlayed = false;
    },
  }));

export type CardModelType = typeof Card.Type;
export type CardModelSnapshotType = typeof Card.SnapshotType;

export const CardStack = types
  .model({
    cards: types.array(Card),
  })
  .views(self => ({
    get totalCards(): number {
      return self.cards.length;
    },
    get totalMoney() {
      return self.cards
        .map(card => card.money)
        .reduce((sum, currentValue) => sum + currentValue, 0);
    },
    get unplayedCards() {
      return self.cards.filter(card => !card.isPlayed);
    },
  }))
  .actions(self => ({
    add(card: CardModelType) {
      self.cards.push(card);
    },
    remove(card: CardModelType) {
      self.cards.remove(card);
    },
  }));

export type CardStackModelType = typeof CardStack.Type;
