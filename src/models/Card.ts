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
  Attack = 'Attack',
  Consumable = 'Consumable',
  Item = 'Item',
  Money = 'Money',
}

export const Card = types
  .model({
    id: types.identifier(types.string),
    name: types.string,
    category: types.enumeration(
      'Category',
      Object.keys(CardCategory).map(key => CardCategory[key])
    ),
    description: types.optional(types.string, ''),
    cost: types.optional(types.number, 0),
    buyingPower: types.optional(types.number, 0),
    isPlayed: types.optional(types.boolean, false),
    effects: types.optional(types.array(CardEffectUnion), []),
  })
  .actions(self => ({
    afterCreate() {
      if (self.description.length > 0) {
        return;
      }
      // Auto generate descriptions
      self.description = self.effects
        .map(effect => {
          if (effect.kind === CardEffectKind.Basic) {
            const { category, value }: BasicCardEffectSnapshotType = effect;
            switch (category) {
              case CardEffectCategory.Damage:
                return `+${value} Attack`;
              case CardEffectCategory.Draw:
                return `Draw ${value} card${value > 1 ? 's' : ''}`;
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
              case InteractiveCardEffectCategory.Trash:
                return `Trash up to ${numCardsToResolve} cards from your hand`;
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
    get totalBuyingPower() {
      return self.cards
        .map(card => card.buyingPower)
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
