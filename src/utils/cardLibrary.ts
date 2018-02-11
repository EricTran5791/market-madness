import {
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveType,
} from '../types/cardEffect.types';
import {
  CardCategory,
  CardSubcategory,
  CardCostKind,
} from '../types/cardTypes';

export const ActionCards = {
  dropShipment: {
    name: 'Drop Shipment',
    category: CardCategory.Action,
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

export const ConsumableCards = {
  apple: {
    name: 'Apple',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
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
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  bread: {
    name: 'Bread',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
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
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  energyDrink: {
    name: 'Energy Drink',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
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
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  spaghetti: {
    name: 'Spaghetti',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
    cost: {
      kind: CardCostKind.Money,
      value: 3,
    },
    effects: [
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 3,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  multivitamins: {
    name: 'Multivitamins',
    category: CardCategory.Consumable,
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
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  verySpicyPepper: {
    name: 'Very Spicy Pepper',
    category: CardCategory.Consumable,
    subcategories: [CardSubcategory.Food],
    cost: {
      kind: CardCostKind.Money,
      value: 5,
    },
    effects: [
      {
        category: CardEffectCategory.GainAttack,
        kind: CardEffectKind.Basic,
        value: 5,
      },
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: -3,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
};

export const ItemCards = {
  basketball: {
    name: 'Basketball',
    category: CardCategory.Item,
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
    cost: {
      kind: CardCostKind.Money,
      value: 0,
    },
  },
  garbageBag: {
    name: 'Garbage Bag',
    category: CardCategory.Item,
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
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  ironPan: {
    name: 'Iron Pan',
    category: CardCategory.Item,
    cost: {
      kind: CardCostKind.Money,
      value: 4,
    },
    effects: [
      {
        category: CardEffectCategory.GainAttack,
        kind: CardEffectKind.Basic,
        value: 4,
      },
    ],
  },
  portableFurnace: {
    name: 'Portable Furnace',
    category: CardCategory.Item,
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

export const MoneyCards = {
  coin: {
    name: 'Coin',
    category: CardCategory.Money,
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

export const NPCCards = {
  baker: {
    name: 'Baker',
    category: CardCategory.NPC,
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
  chef: {
    name: 'Chef',
    category: CardCategory.NPC,
    cost: {
      kind: CardCostKind.Health,
      value: 4,
    },
    effects: [
      {
        category: CardEffectCategory.GainCardToHand,
        kind: CardEffectKind.Basic,
        value: 1,
        gainedCardId: 'spaghetti',
      },
      {
        category: CardEffectCategory.GainCardToDiscardPile,
        kind: CardEffectKind.Basic,
        value: 1,
        gainedCardId: 'ironPan',
      },
    ],
  },
  dietician: {
    name: 'Dietician',
    category: CardCategory.NPC,
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
