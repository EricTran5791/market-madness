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
};

export const AttackCards = {
  punch: {
    name: 'Punch',
    category: CardCategory.attack,
    cost: 1,
  },
};

export const MoneyCards = {
  coin: {
    name: 'Coin',
    category: CardCategory.money,
    cost: 0,
  },
};
