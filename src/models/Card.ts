import { types } from 'mobx-state-tree';
import { CardEffectUnion, BasicCardEffectSnapshotType } from './CardEffect';
import { CardEffect, CardEffectCategory } from '../types/cardEffect.types';
import {
  CardCategory,
  CardSubcategory,
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
    get subcategoriesList() {
      return List<CardSubcategory>(self.subcategories);
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
      addAndShuffle,
      remove,
    };
  });

export type CardStackModelType = typeof CardStack.Type;
