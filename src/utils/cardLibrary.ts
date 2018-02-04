import { CardCategory } from '../models/Card';
import {
  CardEffectCategory,
  InteractiveCardEffectCategory,
  CardEffectKind,
} from '../models/CardEffect';

export const ActionCards = {
  expressShipping: {
    name: 'Express Shipping',
    category: CardCategory.Action,
    cost: 3,
    effects: [
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ],
  },
};

export const ItemCards = {
  apple: {
    name: 'Apple',
    category: CardCategory.Item,
    cost: 1,
    effects: [
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 1,
      },
    ],
  },
  bananas: {
    name: 'Bananas',
    category: CardCategory.Item,
    cost: 2,
    effects: [
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ],
  },
  couponBook: {
    name: 'Coupon Book',
    category: CardCategory.Item,
    cost: 3,
  },
  durian: {
    name: 'Durian',
    category: CardCategory.Item,
    cost: 4,
    effects: [
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      {
        category: CardEffectCategory.Damage,
        kind: CardEffectKind.Basic,
        value: 3,
      },
    ],
  },
  fishBones: {
    name: 'Fish Bones',
    category: CardCategory.Item,
    cost: 0,
  },
  garbageBag: {
    name: 'Garbage Bag',
    category: CardCategory.Item,
    cost: 2,
    effects: [
      {
        category: InteractiveCardEffectCategory.Trash,
        kind: CardEffectKind.Interactive,
        numCardsToResolve: 2,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  multivitamins: {
    name: 'Multivitamins',
    category: CardCategory.Item,
    cost: 2,
    effects: [
      {
        category: CardEffectCategory.IncreaseMaxHealth,
        kind: CardEffectKind.Basic,
        value: 1,
      },
    ],
  },
};

export const AttackCards = {
  slap: {
    name: 'Slap',
    category: CardCategory.Attack,
    cost: 1,
    effects: [
      {
        category: CardEffectCategory.Damage,
        kind: CardEffectKind.Basic,
        value: 1,
      },
    ],
  },
  basketball: {
    name: 'Basketball',
    category: CardCategory.Attack,
    cost: 2,
    effects: [
      {
        category: CardEffectCategory.Damage,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ],
  },
  tennisRacket: {
    name: 'Tennis Racket',
    category: CardCategory.Attack,
    cost: 3,
    effects: [
      {
        category: CardEffectCategory.Damage,
        kind: CardEffectKind.Basic,
        value: 3,
      },
    ],
  },
};

export const MoneyCards = {
  coin: {
    name: 'Coin',
    category: CardCategory.Money,
    cost: 1,
    buyingPower: 1,
  },
  gem: {
    name: 'Gem',
    category: CardCategory.Money,
    cost: 3,
    buyingPower: 2,
  },
};
