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

export interface BasicCardEffect {
  kind: CardEffectKind.Basic;
  category: CardEffectCategory;
  value: number;
  gainedCardId?: string;
}

export interface InteractiveCardEffect {
  kind: CardEffectKind.Interactive;
  category: InteractiveCardEffectCategory;
  resolveType: InteractiveCardEffectResolveType;
  numCardsToResolve?: number;
}

export type CardEffect = BasicCardEffect | InteractiveCardEffect;

export const initialBasicCardEffect: BasicCardEffect = {
  kind: CardEffectKind.Basic,
  category: CardEffectCategory.Draw,
  value: 0,
  gainedCardId: '',
};

export const initialInteractiveCardEffect: InteractiveCardEffect = {
  kind: CardEffectKind.Interactive,
  category: InteractiveCardEffectCategory.Discard,
  resolveType: InteractiveCardEffectResolveType.Optional,
  numCardsToResolve: 0,
};
