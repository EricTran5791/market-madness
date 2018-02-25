import { CardEffect } from './cardEffect.types';

export enum CardKind {
  Normal = 'Normal',
  Instant = 'Instant',
  Money = 'Money',
  NPC = 'NPC',
}

export enum CardCategory {
  Neutral = 'Neutral',
  Money = 'Money',
  NPC = 'NPC',
  Artisanal = 'Artisanal',
  Groceries = 'Groceries',
  Sports = 'Sports',
}

export enum CardSubcategory {
  Food = 'Food',
  SportsEquipment = 'Sports Equipment',
}

export enum CardCostKind {
  Money = 'Money',
  Health = 'Health',
}

export type Card = {
  id: string;
  name: string;
  kind: CardKind;
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

export const initialCardState: Card = {
  id: '',
  name: '',
  kind: CardKind.Normal,
  category: CardCategory.Neutral,
  subcategories: [],
  description: '',
  cost: {
    kind: CardCostKind.Money,
    value: 0,
  },
  effects: [],
};

export type CardLibraryRecord = Record<string, Card>;
