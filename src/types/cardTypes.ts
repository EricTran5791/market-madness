import { CardCategory, CardSubcategory, CardCostKind } from '../models/Card';
import { CardEffect } from './cardEffect.types';
import {
  CardEffectCategory,
  CardEffectKind,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveType,
} from '../models/CardEffect';

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
      numCardsToResolve: 2,
      resolveType: InteractiveCardEffectResolveType.Mandatory,
    },
  ],
};
