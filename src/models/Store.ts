import { types, detach } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';

export const Store = types
  .model('Store', {
    deck: CardStack,
    shopDeck: CardStack,
    hand: CardStack,
    discardPile: CardStack,
  })
  .actions(self => ({
    buyShopCard(card: CardModelType) {
      self.discardPile.add(detach(card));
    },
    moveToDeck(card: CardModelType) {
      self.deck.add(detach(card));
    },
  }));

export type StoreType = typeof Store.Type;
