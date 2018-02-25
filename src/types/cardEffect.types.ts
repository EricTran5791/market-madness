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
  ShuffleCardToDeck = 'Shuffle Card to Deck',
  TopdeckCardToOpposingShopDecks = 'Topdeck Card to Opposing Shop Decks',
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

export type GainedCard = {
  id: string;
  name: string;
};

export interface BasicCardEffect {
  kind: CardEffectKind.Basic;
  category: CardEffectCategory;
  value: number;
  gainedCard?: GainedCard;
}

export interface InteractiveCardEffect {
  kind: CardEffectKind.Interactive;
  category: InteractiveCardEffectCategory;
  resolveType: InteractiveCardEffectResolveType;
  numPlaysToResolve?: number;
}

export type CardEffect = BasicCardEffect | InteractiveCardEffect;

export const initialBasicCardEffect: BasicCardEffect = {
  kind: CardEffectKind.Basic,
  category: CardEffectCategory.Draw,
  value: 0,
};

export const initialInteractiveCardEffect: InteractiveCardEffect = {
  kind: CardEffectKind.Interactive,
  category: InteractiveCardEffectCategory.Discard,
  resolveType: InteractiveCardEffectResolveType.Optional,
  numPlaysToResolve: 0,
};
