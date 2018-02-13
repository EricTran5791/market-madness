import {
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

export const ActionCards: Record<string, Card> = {
  dropShipment: {
    id: 'dropShipment',
    name: 'Drop Shipment',
    category: CardCategory.Action,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 1,
    },
    effects: [
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
    ],
  },
  exchangeGoods: {
    id: 'exchangeGoods',
    name: 'Exchange Goods',
    category: CardCategory.Action,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: [
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
    ],
  },
  expressShipping: {
    id: 'expressShipping',
    name: 'Express Shipping',
    category: CardCategory.Action,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 3,
    },
    effects: [
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ],
  },
};

export const ConsumableCards: Record<string, Card> = {
  apple: {
    id: 'apple',
    name: 'Apple',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 1,
    },
    effects: [
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      {
        category: CardEffectCategory.TrashSelf,
        kind: CardEffectKind.Basic,
        value: 0,
      },
    ],
  },
  bread: {
    id: 'bread',
    name: 'Bread',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: [
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 2,
      },
      {
        category: CardEffectCategory.TrashSelf,
        kind: CardEffectKind.Basic,
        value: 0,
      },
    ],
  },
  energyDrink: {
    id: 'energyDrink',
    name: 'Energy Drink',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: [
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
      {
        category: CardEffectCategory.TrashSelf,
        kind: CardEffectKind.Basic,
        value: 0,
      },
    ],
  },
  multivitamins: {
    id: 'multivitamins',
    name: 'Multivitamins',
    category: CardCategory.Consumable,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 1,
    },
    effects: [
      {
        category: CardEffectCategory.IncreaseMaxHealth,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      {
        category: CardEffectCategory.TrashSelf,
        kind: CardEffectKind.Basic,
        value: 0,
      },
    ],
  },
};

export const ItemCards: Record<string, Card> = {
  basketball: {
    id: 'basketball',
    name: 'Basketball',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 3,
    },
    effects: [
      {
        category: CardEffectCategory.GainAttack,
        kind: CardEffectKind.Basic,
        value: 3,
      },
    ],
  },
  fishBones: {
    id: 'fishBones',
    name: 'Fish Bones',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 0,
    },
    effects: [],
  },
  garbageBag: {
    id: 'garbageBag',
    name: 'Garbage Bag',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: [
      {
        category: InteractiveCardEffectCategory.Trash,
        kind: CardEffectKind.Interactive,
        numCardsToResolve: 2,
        resolveType: InteractiveCardEffectResolveType.Optional,
      },
      {
        category: CardEffectCategory.TrashSelf,
        kind: CardEffectKind.Basic,
        value: 0,
      },
    ],
  },
  portableFurnace: {
    id: 'portableFurnace',
    name: 'Portable Furnace',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 4,
    },
    effects: [
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
    ],
  },
  shoppingBasket: {
    id: 'shoppingBasket',
    name: 'Shopping Basket',
    category: CardCategory.Item,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 2,
    },
    effects: [
      {
        category: CardEffectCategory.GainAttack,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ],
  },
};

export const MoneyCards: Record<string, Card> = {
  coin: {
    id: 'coin',
    name: 'Coin',
    category: CardCategory.Money,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 1,
    },
    effects: [
      {
        category: CardEffectCategory.GainMoney,
        kind: CardEffectKind.Basic,
        value: 1,
      },
    ],
  },
  gem: {
    id: 'gem',
    name: 'Gem',
    category: CardCategory.Money,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Money,
      value: 3,
    },
    effects: [
      {
        category: CardEffectCategory.GainMoney,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ],
  },
};

export const NPCCards: Record<string, Card> = {
  baker: {
    id: 'baker',
    name: 'Baker',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 3,
    },
    effects: [
      {
        category: CardEffectCategory.GainCardToHand,
        kind: CardEffectKind.Basic,
        value: 1,
        gainedCardId: 'bread',
      },
    ],
  },
  businessPerson: {
    id: 'businessPerson',
    name: 'Business Person',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 4,
    },
    effects: [
      {
        category: CardEffectCategory.GainMoney,
        kind: CardEffectKind.Basic,
        value: 3,
      },
    ],
  },
  dietician: {
    id: 'dietician',
    name: 'Dietician',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 2,
    },
    effects: [
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
    ],
  },
  postalWorker: {
    id: 'postalWorker',
    name: 'Postal Worker',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 2,
    },
    effects: [
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 1,
      },
    ],
  },
};
