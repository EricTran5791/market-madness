import { types } from 'mobx-state-tree';
import { CardEffect, CardEffectCategory } from './CardEffect';
export enum CardCategory {
  Action = 'Action',
  Attack = 'Attack',
  Item = 'Item',
  Money = 'Money',
}

export const Card = types
  .model({
    name: types.string,
    category: types.enumeration(
      'Category',
      Object.keys(CardCategory).map(key => CardCategory[key])
    ),
    description: types.optional(types.string, ''),
    cost: types.optional(types.number, 0),
    buyingPower: types.optional(types.number, 0),
    isPlayed: types.optional(types.boolean, false),
    effects: types.optional(types.array(CardEffect), []),
  })
  .actions(self => ({
    afterCreate() {
      // Auto generate descriptions
      if (self.description === '' && self.effects.length > 0) {
        self.description = self.effects
          .map(effect => {
            switch (effect.category) {
              case CardEffectCategory.Damage:
                return `Deal ${effect.value} damage`;
              case CardEffectCategory.Draw:
                return `Draw ${effect.value} card${
                  effect.value > 1 ? 's' : ''
                }`;
              case CardEffectCategory.Heal:
                return `Heal ${effect.value}`;
              case CardEffectCategory.IncreaseMaxHealth:
                return `Increase max health by ${effect.value}`;
              default:
                return '';
            }
          })
          .join(', ');
      }
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
