import { types, destroy, clone, getParent } from 'mobx-state-tree';
import { Card, CardModelType } from './Card';
import {
  InteractiveCardEffect,
  InteractiveCardEffectModelType,
} from './CardEffect';
import { StoreType } from './Store';

export enum ActiveCardEffectStatus {
  NotActive = 'Not Active',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

/** Tracks the active interactive card effect. */
export const ActiveCardEffectState = types
  .model('ActiveCardEffectState', {
    /** A copy of the active interactive card effect. */
    effect: types.maybe(InteractiveCardEffect),
    /** An array of cards that will be resolved by the effect. */
    cardsToResolve: types.optional(types.array(types.reference(Card)), []),
    status: types.optional(
      types.enumeration(
        'Category',
        Object.keys(ActiveCardEffectStatus).map(
          key => ActiveCardEffectStatus[key]
        )
      ),
      ActiveCardEffectStatus.NotActive
    ),
  })
  .views(self => ({
    /** The number of card or shop deck selections required to resolve the effect. */
    get numPlaysToResolve() {
      return (self.effect && self.effect.numPlaysToResolve) || -1;
    },
    get resolveType() {
      return self.effect && self.effect.resolveType;
    },
    get activeEffectCategory() {
      return (self.effect && self.effect.category) || '';
    },
  }))
  .actions(self => ({
    setActiveEffect(effect: InteractiveCardEffectModelType) {
      self.effect = clone(effect); // Keep a clone of the effect for reference.
      self.cardsToResolve.clear();
      self.status = ActiveCardEffectStatus.InProgress;
    },
    clearActiveEffect() {
      if (self.effect) {
        destroy(self.effect);
      }
      self.effect = null;
      self.cardsToResolve.clear();
      self.status = ActiveCardEffectStatus.NotActive;
    },
    completeActiveEffect() {
      self.status = ActiveCardEffectStatus.Completed;
    },
    addCardToResolve(card: CardModelType) {
      self.cardsToResolve.push(card);
      const store: StoreType = getParent(getParent(self));
      // Complete the effect once we reach the target number of cards to
      // resolve or when we no longer have any playable cards in hand.
      if (
        self.cardsToResolve.length === self.numPlaysToResolve ||
        store.currentPlayer.hand.cardStack.unplayedCards.length === 0
      ) {
        self.status = ActiveCardEffectStatus.Completed;
      }
    },
  }));
