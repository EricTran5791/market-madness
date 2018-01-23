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
  cost: types.number,
});

export type CardModelType = typeof Card.Type;
export type CardModelSnapshotType = typeof Card.SnapshotType;

export const CardStack = types
  .model({
    cards: types.array(Card),
  })
  .actions(self => ({
    add(card: CardModelType) {
      self.cards.push(card);
    },
    remove(card: CardModelType) {
      self.cards.remove(card);
    },
  }));

export type CardStackModelType = typeof CardStack.Type;
