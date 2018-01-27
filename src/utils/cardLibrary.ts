import { CardCategory } from '../models/Card';

export const ActionCards = {
  apple: {
    name: 'Apple',
    category: CardCategory.action,
    cost: 1,
  },
  bananas: {
    name: 'Bananas',
    category: CardCategory.action,
    cost: 2,
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
  },
};

export const AttackCards = {
  punch: {
    name: 'Punch',
    category: CardCategory.attack,
    cost: 1,
    attackValue: 1,
  },
  basketball: {
    name: 'Basketball',
    category: CardCategory.attack,
    cost: 2,
    attackValue: 2,
  },
  tennisRacket: {
    name: 'Tennis Racket',
    category: CardCategory.attack,
    cost: 3,
    attackValue: 3,
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
