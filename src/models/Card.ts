import { types } from 'mobx-state-tree';

export enum CardCategory {
  action = 'Action',
  attack = 'Attack',
  money = 'Money',
}

export const Card = types.model({
  name: types.string,
  category: types.enumeration(
    'Category',
    Object.keys(CardCategory).map(key => CardCategory[key])
  ),
  description: types.optional(types.string, ''),
  cost: types.optional(types.number, 0),
  buyingPower: types.optional(types.number, 0),
  attackValue: types.optional(types.number, 0),
});

export type CardModelType = typeof Card.Type;
export type CardModelSnapshotType = typeof Card.SnapshotType;

export const CardStack = types
  .model({
    cards: types.array(Card),
  })
  .views(self => ({
    get totalBuyingPower() {
      return self.cards
        .map(card => card.buyingPower)
        .reduce((sum, currentValue) => sum + currentValue, 0);
    },
    get totalAttackValue() {
      return self.cards
        .map(card => card.attackValue)
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
