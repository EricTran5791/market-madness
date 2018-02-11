import {
  CardEffect,
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveType,
} from './cardEffect.types';

export enum CardCategory {
  Action = 'Action',
  Consumable = 'Consumable',
  Item = 'Item',
  Money = 'Money',
  NPC = 'NPC',
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
  name: '',
  category: CardCategory.Item,
  subcategories: [],
  description: '',
  cost: {
    kind: CardCostKind.Money,
    value: 0,
  },
  // TEMP
  effects: [
    {
      category: CardEffectCategory.GainAttack,
      kind: CardEffectKind.Basic,
      value: 2,
    },
    {
      category: CardEffectCategory.Heal,
      kind: CardEffectKind.Basic,
      value: 2,
    },
    {
      category: InteractiveCardEffectCategory.Trash,
      kind: CardEffectKind.Interactive,
      resolveType: InteractiveCardEffectResolveType.Mandatory,
      numCardsToResolve: 2,
    },
  ],
};
