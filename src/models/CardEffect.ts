import { types, isStateTreeNode, getSnapshot } from 'mobx-state-tree';
import {
  CardEffectKind,
  CardEffectCategory,
  InteractiveCardEffectCategory,
  InteractiveCardEffectResolveKind,
  InteractiveCardEffectResolveTarget,
} from '../types/cardEffect.types';

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
  /** The card to be gained from the effect. */
  gainedCard: types.maybe(
    types
      .model('GainedCard', {
        id: types.string,
        name: types.string,
      })
      .preProcessSnapshot(snapshot => {
        // Workaround for MobX State Tree bug where the object may get added to a state tree that it already lives in
        // https://github.com/mobxjs/mobx-state-tree/issues/616
        return isStateTreeNode(snapshot) ? getSnapshot(snapshot) : snapshot;
      })
  ),
});

export type BasicCardEffectSnapshotType = typeof BasicCardEffect.SnapshotType;

/** A card effect that requires further interaction from the player. Ex: Choosing cards from the player's hand. */
export const InteractiveCardEffect = CardEffect.named(
  'InteractiveCardEffect'
).props({
  kind: types.literal(CardEffectKind.Interactive),
  category: types.enumeration(
    'InteractiveCardEffectCategory',
    Object.keys(InteractiveCardEffectCategory).map(
      key => InteractiveCardEffectCategory[key]
    )
  ),
  resolveCondition: types.model('ResolveCondition', {
    kind: types.optional(
      types.enumeration(
        'InteractiveCardEffectResolveKind',
        Object.keys(InteractiveCardEffectResolveKind).map(
          key => InteractiveCardEffectResolveKind[key]
        )
      ),
      InteractiveCardEffectResolveKind.Optional
    ),
    target: types.optional(
      types.enumeration(
        'InteractiveCardEffectResolveTarget',
        Object.keys(InteractiveCardEffectResolveTarget).map(
          key => InteractiveCardEffectResolveTarget[key]
        )
      ),
      InteractiveCardEffectResolveTarget.CardsInHand
    ),
    /** The number of card or shop deck selections to resolve the card effect. */
    numPlaysToResolve: types.optional(types.number, 0),
  }),
});

export type InteractiveCardEffectModelType = typeof InteractiveCardEffect.Type;
export type InteractiveCardEffectSnapshotType = typeof InteractiveCardEffect.SnapshotType;

export const CardEffectUnion = types.union(
  BasicCardEffect,
  InteractiveCardEffect
);
