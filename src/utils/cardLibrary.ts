import {
  CardEffect,
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveType,
} from '../types/cardEffect.types';
import {
  Card,
  CardCategory,
  CardSubcategory,
  CardCostKind,
} from '../types/cardTypes';
import { List } from 'immutable';

export const ActionCards: Record<string, Card> = {
  dropShipment: {
    name: 'Drop Shipment',
    category: CardCategory.Action,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 1,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainAttack,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 1,
      },
    ]),
  },
  exchangeGoods: {
    name: 'Exchange Goods',
    category: CardCategory.Action,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 2,
      },
      {
        category: InteractiveCardEffectCategory.Discard,
        kind: CardEffectKind.Interactive,
        numCardsToResolve: 2,
        resolveType: InteractiveCardEffectResolveType.Mandatory,
      },
    ]),
  },
  expressShipping: {
    name: 'Express Shipping',
    category: CardCategory.Action,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 3,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ]),
  },
};

export const ConsumableCards = {
  apple: {
    name: 'Apple',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 1,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ]),
  },
  bread: {
    name: 'Bread',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 2,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ]),
  },
  energyDrink: {
    name: 'Energy Drink',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ]),
  },
  multivitamins: {
    name: 'Multivitamins',
    category: CardCategory.Consumable,
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 1,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.IncreaseMaxHealth,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ]),
  },
};

export const ItemCards = {
  basketball: {
    name: 'Basketball',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 3,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainAttack,
        kind: CardEffectKind.Basic,
        value: 3,
      },
    ]),
  },
  fishBones: {
    name: 'Fish Bones',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 0,
    },
    effects: List<CardEffect>([]),
  },
  garbageBag: {
    name: 'Garbage Bag',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: List<CardEffect>([
      {
        category: InteractiveCardEffectCategory.Trash,
        kind: CardEffectKind.Interactive,
        numCardsToResolve: 2,
        resolveType: InteractiveCardEffectResolveType.Optional,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ]),
  },
  portableFurnace: {
    name: 'Portable Furnace',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 4,
    },
    effects: List<CardEffect>([
      {
        category: InteractiveCardEffectCategory.Trash,
        kind: CardEffectKind.Interactive,
        numCardsToResolve: 2,
        resolveType: InteractiveCardEffectResolveType.Mandatory,
      },
      {
        category: CardEffectCategory.GainCardToHand,
        kind: CardEffectKind.Basic,
        value: 1,
        gainedCardId: 'gem',
      },
    ]),
  },
  shoppingBasket: {
    name: 'Shopping Basket',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainAttack,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ]),
  },
  wetMop: {
    name: 'Wet Mop',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 3,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainAttack,
        kind: CardEffectKind.Basic,
        value: 3,
      },
    ]),
  },
};

export const MoneyCards = {
  coin: {
    name: 'Coin',
    category: CardCategory.Money,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 1,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainMoney,
        kind: CardEffectKind.Basic,
        value: 1,
      },
    ]),
  },
  gem: {
    name: 'Gem',
    category: CardCategory.Money,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 3,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainMoney,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ]),
  },
};

export const NPCCards = {
  baker: {
    name: 'Baker',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 3,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainCardToHand,
        kind: CardEffectKind.Basic,
        value: 1,
        gainedCardId: 'bread',
      },
    ]),
  },
  businessPerson: {
    name: 'Business Person',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 4,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainMoney,
        kind: CardEffectKind.Basic,
        value: 3,
      },
    ]),
  },
  dietician: {
    name: 'Dietician',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 2,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainCardToHand,
        kind: CardEffectKind.Basic,
        value: 1,
        gainedCardId: 'apple',
      },
      {
        category: CardEffectCategory.GainCardToHand,
        kind: CardEffectKind.Basic,
        value: 1,
        gainedCardId: 'multivitamins',
      },
    ]),
  },
  janitor: {
    name: 'Janitor',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 3,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.GainCardToDiscardPile,
        kind: CardEffectKind.Basic,
        value: 1,
        gainedCardId: 'wetMop',
      },
    ]),
  },
  postalWorker: {
    name: 'Postal Worker',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 2,
    },
    effects: List<CardEffect>([
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 1,
      },
    ]),
  },
};
