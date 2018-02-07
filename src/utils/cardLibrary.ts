import { CardCategory } from '../models/Card';
import {
  CardEffectCategory,
  InteractiveCardEffectCategory,
  CardEffectKind,
  InteractiveCardEffectResolveType,
} from '../models/CardEffect';

export const ActionCards = {
  exchangeGoods: {
    name: 'Exchange Goods',
    category: CardCategory.Action,
    cost: 2,
    effects: [
      {
        category: CardEffectCategory.Draw,
        kind: CardEffectKind.Basic,
        value: 2,
      },
      {
        category: InteractiveCardEffectCategory.MandatoryDiscard,
        kind: CardEffectKind.Interactive,
        numCardsToResolve: 2,
        resolveType: InteractiveCardEffectResolveType.Mandatory,
      },
    ],
  },
  expressShipping: {
    name: 'Express Shipping',
    category: CardCategory.Action,
    cost: 3,
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
    cost: 1,
    effects: [
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  bananas: {
    name: 'Bananas',
    category: CardCategory.Consumable,
    cost: 2,
    effects: [
      {
        category: CardEffectCategory.Heal,
        kind: CardEffectKind.Basic,
        value: 2,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  multivitamins: {
    name: 'Multivitamins',
    category: CardCategory.Consumable,
    cost: 1,
    effects: [
      {
        category: CardEffectCategory.IncreaseMaxHealth,
        kind: CardEffectKind.Basic,
        value: 1,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
};

export const ItemCards = {
  basketball: {
    name: 'Basketball',
    category: CardCategory.Item,
    cost: 2,
    effects: [
      {
        category: CardEffectCategory.GainAttackValue,
        kind: CardEffectKind.Basic,
        value: 2,
      },
    ],
  },
  fishBones: {
    name: 'Fish Bones',
    category: CardCategory.Item,
    cost: 0,
  },
  garbageBag: {
    name: 'Garbage Bag',
    category: CardCategory.Item,
    cost: 2,
    effects: [
      {
        category: InteractiveCardEffectCategory.OptionalTrash,
        kind: CardEffectKind.Interactive,
        numCardsToResolve: 2,
      },
      { category: CardEffectCategory.TrashSelf, kind: CardEffectKind.Basic },
    ],
  },
  wetMop: {
    name: 'Wet Mop',
    category: CardCategory.Item,
    cost: 3,
    effects: [
      {
        category: CardEffectCategory.GainAttackValue,
        kind: CardEffectKind.Basic,
        value: 3,
      },
    ],
  },
  coatRack: {
    name: 'Coat Rack',
    category: CardCategory.Item,
    cost: 5,
    effects: [
      {
        category: CardEffectCategory.GainAttackValue,
        kind: CardEffectKind.Basic,
        value: 5,
      },
    ],
  },
};

export const AttackCards = {
  dropShipment: {
    name: 'Drop Shipment',
    category: CardCategory.Attack,
    cost: 1,
    effects: [
      {
        category: CardEffectCategory.GainAttackValue,
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
};

export const MoneyCards = {
  coin: {
    name: 'Coin',
    category: CardCategory.Money,
    cost: 1,
    money: 1,
  },
  gem: {
    name: 'Gem',
    category: CardCategory.Money,
    cost: 3,
    money: 2,
  },
};

export const NPCCards = {
  businessPerson: {
    name: 'Business Person',
    category: CardCategory.NPC,
    health: 4,
    effects: [
      {
        category: CardEffectCategory.GainMoney,
        kind: CardEffectKind.Basic,
        value: 3,
      },
    ],
  },
};
