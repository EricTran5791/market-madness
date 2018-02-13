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
  wetMop: {
    name: 'Wet Mop',
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
};

export const MoneyCards: Record<string, Card> = {
  coin: {
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
  janitor: {
    name: 'Janitor',
    category: CardCategory.NPC,
    subcategories: [],
    description: '',
    cost: {
      kind: CardCostKind.Health,
      value: 3,
    },
    effects: [
      {
        category: CardEffectCategory.GainCardToDiscardPile,
        kind: CardEffectKind.Basic,
        value: 1,
        gainedCardId: 'wetMop',
      },
    ],
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
    effects: [
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 1,
      },
    ],
  },
};
