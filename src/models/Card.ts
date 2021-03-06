import { types } from 'mobx-state-tree';
import { CardEffectUnion, BasicCardEffectSnapshotType } from './CardEffect';
import { CardEffect, CardEffectCategory } from '../types/cardEffect.types';
import {
  CardKind,
  CardShop,
  CardCategory,
  CardCostKind,
} from '../types/cardTypes';
import { List } from 'immutable';
import { shuffleCardStackModel } from '../utils/cardGenerator';

export const Card = types
  .model({
    /** An instance-specific unique id for state reconciliation purposes (ex: cloning). */
    uniqid: types.identifier(types.string),
    id: types.string,
    name: types.string,
    kind: types.optional(
      types.enumeration(
        'Kind',
        Object.keys(CardKind).map(key => CardKind[key])
      ),
      CardKind.Normal
    ),
    shop: types.optional(
      types.enumeration(
        'Shop',
        Object.keys(CardShop).map(key => CardShop[key])
      ),
      CardShop.Neutral
    ),
    categories: types.optional(
      types.array(
        types.enumeration(
          'Category',
          Object.keys(CardCategory).map(key => CardCategory[key])
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
    get categoriesList() {
      return List<CardCategory>(self.categories);
    },
    get effectsList() {
      return List<CardEffect>(self.effects);
    },
    /** Returns only the properties required for viewing and not playing. */
    get viewData() {
      const { uniqid, isPlayed, ...card } = self;
      return card;
    },
  }))
  .actions(self => ({
    /** Reset a card's isPlayed status every time it is detached from its direct parent. */
    beforeDetach() {
      self.isPlayed = false;
    },
    /** The card in a JSON format, used by the JSON preview in the card editor. */
    getCardJson() {
      return JSON.stringify(self.viewData, undefined, 2);
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
    get unplayedCards() {
      return self.cards.filter(card => !card.isPlayed);
    },
  }))
  .actions(self => {
    function add(card: CardModelType) {
      self.cards.push(card);
    }

    function addToFront(card: CardModelType) {
      self.cards.unshift(card);
    }

    function addAndShuffle(card: CardModelType) {
      self.cards.push(card);
      shuffleCards();
    }

    function shuffleCards() {
      shuffleCardStackModel(self as CardStackModelType);
    }

    function remove(card: CardModelType) {
      self.cards.remove(card);
    }

    return {
      add,
      addToFront,
      addAndShuffle,
      remove,
    };
  });

export type CardStackModelType = typeof CardStack.Type;
