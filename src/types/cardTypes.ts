import { CardEffect } from './cardEffect.types';

export enum CardKind {
  Normal = 'Normal',
  Instant = 'Instant',
  Money = 'Money',
  NPC = 'NPC',
}

export enum CardShop {
  Neutral = 'Neutral',
  Artisanal = 'Artisanal',
  Groceries = 'Groceries',
  Sports = 'Sports',
}

export enum CardCategory {
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
  shop: CardShop;
  categories: CardCategory[];
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
  shop: CardShop.Neutral,
  categories: [],
  description: '',
  cost: {
    kind: CardCostKind.Money,
    value: 0,
  },
  effects: [],
};

export type CardLibraryRecord = Record<string, Card>;
