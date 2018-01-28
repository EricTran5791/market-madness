import { CardCategory } from '../models/Card';
import { CardEffectCategory } from '../models/CardEffect';

export const ActionCards = {
  expressShipping: {
    name: 'Express Shipping',
    category: CardCategory.Action,
    cost: 3,
    effects: [{ category: CardEffectCategory.Draw, value: 2 }],
  },
};

export const ItemCards = {
  apple: {
    name: 'Apple',
    category: CardCategory.Item,
    cost: 1,
    effects: [{ category: CardEffectCategory.Heal, value: 1 }],
  },
  bananas: {
    name: 'Bananas',
    category: CardCategory.Item,
    cost: 2,
    effects: [{ category: CardEffectCategory.Heal, value: 2 }],
  },
  couponBook: {
    name: 'Coupon Book',
    category: CardCategory.Item,
    cost: 3,
  },
  dragonFruit: {
    name: 'Dragon Fruit',
    category: CardCategory.Item,
    cost: 4,
    effects: [{ category: CardEffectCategory.Heal, value: 4 }],
  },
};

export const AttackCards = {
  slap: {
    name: 'Slap',
    category: CardCategory.Attack,
    cost: 1,
    effects: [{ category: CardEffectCategory.Damage, value: 1 }],
  },
  basketball: {
    name: 'Basketball',
    category: CardCategory.Attack,
    cost: 2,
    effects: [{ category: CardEffectCategory.Damage, value: 2 }],
  },
  tennisRacket: {
    name: 'Tennis Racket',
    category: CardCategory.Attack,
    cost: 3,
    effects: [{ category: CardEffectCategory.Damage, value: 3 }],
  },
};

export const MoneyCards = {
  coin: {
    name: 'Coin',
    category: CardCategory.Money,
    cost: 0,
    buyingPower: 1,
  },
  gem: {
    name: 'Gem',
    category: CardCategory.Money,
    cost: 3,
    buyingPower: 2,
  },
};
