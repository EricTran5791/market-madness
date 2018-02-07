import { types } from 'mobx-state-tree';

export enum CardEffectCategory {
  Draw = 'Draw',
  GainAttackValue = 'Gain Attack Value',
  GainMoney = 'Gain Money',
  Heal = 'Heal',
  IncreaseMaxHealth = 'Increase Max Health',
  TrashSelf = 'Trash Self',
}

export enum InteractiveCardEffectCategory {
  MandatoryDiscard = 'Mandatory Discard',
  OptionalTrash = 'Optional Trash',
}

export enum CardEffectKind {
  Basic = 'Basic',
  Interactive = 'Interactive',
}

export const CardEffect = types.model('CardEffect', {
  kind: types.enumeration(
    'CardEffectKind',
    Object.keys(CardEffectKind).map(key => CardEffectKind[key])
  ),
});

/** A card effect that resolves automatically. Ex: Draw a card from the player's deck. */
export const BasicCardEffect = CardEffect.named('BasicCardEffect').props({
  category: types.enumeration(
    'CardEffectCategory',
    Object.keys(CardEffectCategory).map(key => CardEffectCategory[key])
  ),
  value: types.optional(types.number, 0),
});

export type BasicCardEffectSnapshotType = typeof BasicCardEffect.SnapshotType;

export enum InteractiveCardEffectResolveType {
  Mandatory = 'Mandatory',
  Optional = 'Optional',
}

/** A card effect that requires further interaction from the player. Ex: Choosing cards from the player's hand. */
export const InteractiveCardEffect = CardEffect.named(
  'InteractiveCardEffect'
).props({
  category: types.enumeration(
    'InteractiveCardEffectCategory',
    Object.keys(InteractiveCardEffectCategory).map(
      key => InteractiveCardEffectCategory[key]
    )
  ),
  kind: types.literal(CardEffectKind.Interactive),
  /** The number of cards that should be played to resolve the card effect. */
  numCardsToResolve: types.optional(types.number, 0),
  resolveType: types.optional(
    types.enumeration(
      'InteractiveCardEffectCategory',
      Object.keys(InteractiveCardEffectResolveType).map(
        key => InteractiveCardEffectResolveType[key]
      )
    ),
    InteractiveCardEffectResolveType.Optional
  ),
});

export type InteractiveCardEffectModelType = typeof InteractiveCardEffect.Type;
export type InteractiveCardEffectSnapshotType = typeof InteractiveCardEffect.SnapshotType;

export const CardEffectUnion = types.union(
  BasicCardEffect,
  InteractiveCardEffect
);
