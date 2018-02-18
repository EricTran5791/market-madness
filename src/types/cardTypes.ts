import { CardEffect } from './cardEffect.types';

export enum CardCategory {
  Neutral = 'Neutral',
  Money = 'Money',
  NPC = 'NPC',
  Groceries = 'Groceries',
  Hardware = 'Hardware',
  Sports = 'Sports',
}

export enum CardSubcategory {
  Food = 'Food',
  SportsEquipment = 'Sports Equipment',
  Tool = 'Tool',
}

export enum CardCostKind {
  Money = 'Money',
  Health = 'Health',
}

export type Card = {
  id: string;
  name: string;
  category: CardCategory;
  subcategories: CardSubcategory[];
  description: string;
  cost: {
    kind: CardCostKind;
    value: number;
  };
  effects: CardEffect[];
  isPlayed?: boolean;
};

export const initialCard: Card = {
  id: '',
  name: '',
  category: CardCategory.Hardware,
  subcategories: [],
  description: '',
  cost: {
    kind: CardCostKind.Money,
    value: 0,
  },
  effects: [],
};

export type CardLibrary = Record<string, Card>;
