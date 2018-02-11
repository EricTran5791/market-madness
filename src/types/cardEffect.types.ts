export enum CardEffectKind {
  Basic = 'Basic',
  Interactive = 'Interactive',
}

export enum CardEffectCategory {
  Draw = 'Draw',
  GainAttack = 'Gain Attack',
  GainCardToDiscardPile = 'Gain Card to Discard Pile',
  GainCardToHand = 'Gain Card to Hand',
  GainMoney = 'Gain Money',
  Heal = 'Heal',
  IncreaseMaxHealth = 'Increase Max Health',
  TrashSelf = 'Trash Self',
}

export enum InteractiveCardEffectCategory {
  Discard = 'Discard',
  Trash = 'Trash',
}

export enum InteractiveCardEffectResolveType {
  Mandatory = 'Mandatory',
  Optional = 'Optional',
}

interface BasicCardEffect {
  kind: CardEffectKind.Basic;
  category: CardEffectCategory;
  value?: number;
  gainedCardName?: string;
}

interface InteractiveCardEffect {
  kind: CardEffectKind.Interactive;
  category: InteractiveCardEffectCategory;
  numCardsToResolve?: number;
  resolveType: InteractiveCardEffectResolveType;
}

export type CardEffect = BasicCardEffect | InteractiveCardEffect;

export const initialBasicCardEffect: BasicCardEffect = {
  kind: CardEffectKind.Basic,
  category: CardEffectCategory.Draw,
  value: 0,
  gainedCardName: '',
};

export const initialInteractiveCardEffect: InteractiveCardEffect = {
  kind: CardEffectKind.Interactive,
  category: InteractiveCardEffectCategory.Trash,
  numCardsToResolve: 0,
  resolveType: InteractiveCardEffectResolveType.Optional,
};
