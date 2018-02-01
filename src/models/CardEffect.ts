import { types } from 'mobx-state-tree';

export enum CardEffectCategory {
  Damage = 'Damage',
  Discount = 'Discount',
  Draw = 'Draw',
  Heal = 'Heal',
  IncreaseMaxHealth = 'Increase Max Health',
  TrashSelf = 'Trash Self',
}

export const CardEffect = types.model('CardEffect', {
  category: types.enumeration(
    'CardEffectCategory',
    Object.keys(CardEffectCategory).map(key => CardEffectCategory[key])
  ),
  value: types.optional(types.number, 0),
});

export type CardEffectModelType = typeof CardEffect.Type;

export enum InteractiveCardEffectCategory {
  Trash = 'Trash',
}

/** A card effect that requires further interaction from the player. Ex: Choosing cards from the player's hand. */
export const InteractiveCardEffect = types.model('InteractiveCardEffect', {
  category: types.enumeration(
    'InteractiveCardEffectCategory',
    Object.keys(InteractiveCardEffectCategory).map(
      key => InteractiveCardEffectCategory[key]
    )
  ),
  /** The number of cards that should be played to resolve the card effect. */
  numCardsToResolve: types.optional(types.number, 0),
});
