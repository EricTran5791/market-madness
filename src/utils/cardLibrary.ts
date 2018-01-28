import { CardCategory } from '../models/Card';
import { CardEffectCategory } from '../models/CardEffect';

export const ActionCards = {
  apple: {
    name: 'Apple',
    category: CardCategory.action,
    cost: 1,
    effects: [{ category: CardEffectCategory.Heal, value: 1 }],
  },
  bananas: {
    name: 'Bananas',
    category: CardCategory.action,
    cost: 2,
    effects: [{ category: CardEffectCategory.Heal, value: 2 }],
  },
  couponBook: {
    name: 'Coupon Book',
    category: CardCategory.action,
    cost: 3,
  },
  dragonFruit: {
    name: 'Dragon Fruit',
    category: CardCategory.action,
    cost: 4,
    effects: [{ category: CardEffectCategory.Heal, value: 4 }],
  },
};

export const AttackCards = {
  slap: {
    name: 'Slap',
    category: CardCategory.attack,
    cost: 1,
    effects: [{ category: CardEffectCategory.Damage, value: 1 }],
  },
  basketball: {
    name: 'Basketball',
    category: CardCategory.attack,
    cost: 2,
    effects: [{ category: CardEffectCategory.Damage, value: 2 }],
  },
  tennisRacket: {
    name: 'Tennis Racket',
    category: CardCategory.attack,
    cost: 3,
    effects: [{ category: CardEffectCategory.Damage, value: 3 }],
  },
};

export const MoneyCards = {
  coin: {
    name: 'Coin',
    category: CardCategory.money,
    cost: 0,
    buyingPower: 1,
  },
  gem: {
    name: 'Gem',
    category: CardCategory.money,
    cost: 3,
    buyingPower: 2,
  },
};
