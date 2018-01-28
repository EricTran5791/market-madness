import { types } from 'mobx-state-tree';

export enum CardEffectCategory {
  Damage = 'Damage',
  Discount = 'Discount',
  Draw = 'Draw',
  Heal = 'Heal',
}

export const CardEffect = types.model('CardEffect', {
  category: types.enumeration(
    'CardEffectCategory',
    Object.keys(CardEffectCategory).map(key => CardEffectCategory[key])
  ),
  value: types.optional(types.number, 0),
});

export type CardEffectModelType = typeof CardEffect.Type;
