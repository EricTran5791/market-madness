import { types } from 'mobx-state-tree';
import { CardEffectUnion, BasicCardEffectSnapshotType } from './CardEffect';
import { CardEffect, CardEffectCategory } from '../types/cardEffect.types';
import {
  CardCategory,
  CardSubcategory,
  CardCostKind,
} from '../types/cardTypes';
import { generateCardDescription } from '../utils/cardGenerator';
import { List } from 'immutable';

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
    cost: types.model('Cost', {
      kind: types.optional(
        types.enumeration(
          'CardCostKind',
          Object.keys(CardCostKind).map(key => CardCostKind[key])
        ),
        CardCostKind.Money
      ),
      value: types.optional(types.number, 0),
    }),
    effects: types.optional(types.array(CardEffectUnion), []),
    isPlayed: types.optional(types.boolean, false),
  })
  .views(self => ({
    /** Get the total money value that can be gained by the card. */
    get totalMoneyValue() {
      return (
        0 ||
        self.effects
          .filter(_ => _.category === CardEffectCategory.GainMoney)
          .map((_: BasicCardEffectSnapshotType) => _.value)
          .reduce((sum, currentValue) => sum + currentValue, 0)
      );
    },
  }))
  .actions(self => ({
    afterCreate() {
      if (self.description.length > 0 || self.effects.length === 0) {
        return;
      }
      // TODO: No need to call this once we read cards from the JSON library
      self.description = generateCardDescription(
        self.category as CardCategory,
        List<CardEffect>(self.effects)
      );
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
        .map(card => card.totalMoneyValue)
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
