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
    moveToHand(card: CardModelType) {
      self.hand.add(detach(card));
    },
    moveToDeck(card: CardModelType) {
      self.deck.add(detach(card));
    },
    endTurn() {
      // Put hand into discard pile
      self.hand.cards.forEach(card => {
        self.discardPile.add(detach(card));
      });

      // Draw up to 5 cards from the deck
      const numDeckDraws = Math.min(self.deck.cards.length, 5);
      for (let i = 0; i < numDeckDraws; i++) {
        self.hand.add(detach(self.deck.cards[0]));
      }

      // If there aren't enough cards in the deck:
      // 1) We shuffle the discard pile
      // 2) Move the discard pile into the deck
      // 3) Draw the remaining amount
      const remainingDeckDraws = 5 - numDeckDraws;
      if (remainingDeckDraws > 0) {
        const discardPile = self.discardPile.cards;

        // Shuffle the discard pile
        for (let i = discardPile.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          discardPile.move(i, j);
        }

        // Move the discard pile to the deck
        self.discardPile.cards.forEach(card => {
          self.deck.add(detach(card));
        });
      }

      // Draw the remaining amount of cards
      for (let i = 0; i < remainingDeckDraws; i++) {
        self.hand.add(detach(self.deck.cards[0]));
      }
    },
  }));

export type StoreType = typeof Store.Type;
