import { types, detach } from 'mobx-state-tree';
import { Hand } from './Hand';
import { CardStack } from './Card';
import { shuffleCardStackModel } from '../utils/cardGenerator';

export enum PlayerId {
  Player1 = 'Player 1',
  Computer = 'Computer',
}

export const Player = types
  .model('Player', {
    id: types.identifier(types.string),
    health: types.optional(types.number, 15),
    maxHealth: types.optional(types.number, 15),
    discardPile: CardStack,
    hand: Hand,
    deck: CardStack,
  })
  .actions(self => ({
    heal(healValue: number): number {
      const healthDiff = self.maxHealth - self.health;
      const amtHealed = healValue <= healthDiff ? healValue : healthDiff;
      if (amtHealed === 0) {
        // This is a hack to force a render of the entry log since the player model doesn't change on a 0 heal
        self.health -= 1;
        self.health += 1;
      } else {
        self.health += amtHealed;
      }
      return amtHealed;
    },
    increaseMaxHealth(value: number) {
      self.maxHealth += value;
    },
    takeDamage(value: number) {
      self.health -= value;
    },
    clearHand() {
      // Put hand into discard pile
      self.hand.cardStack.cards.forEach(card => {
        card.isPlayed = false;
        self.discardPile.add(detach(card));
      });
      // Put gained cards into discard pile
      self.hand.gainedCardStack.cards.forEach(card => {
        self.discardPile.add(detach(card));
      });
      // Reset hand stats
      self.hand.spentBuyingPower = 0;
    },
    drawFromDeck(numToDraw: number): number {
      let cardsDrawn = 0;
      // Draw up to x cards from the deck
      const numDeckDraws = Math.min(self.deck.cards.length, numToDraw);
      for (let i = 0; i < numDeckDraws; i++) {
        cardsDrawn++;
        self.hand.cardStack.add(detach(self.deck.cards[0]));
      }

      // If there aren't enough cards in the deck:
      // 1) We shuffle the discard pile
      // 2) Move the discard pile into the deck
      // 3) Draw the remaining amount
      const remainingDeckDraws = numToDraw - numDeckDraws;
      if (remainingDeckDraws > 0) {
        shuffleCardStackModel(self.discardPile);

        // Move the discard pile to the deck
        self.discardPile.cards.forEach(card => {
          self.deck.add(detach(card));
        });

        // Draw the remaining amount of cards
        for (
          let i = 0;
          i < Math.min(remainingDeckDraws, self.deck.cards.length);
          i++
        ) {
          cardsDrawn++;
          self.hand.cardStack.add(detach(self.deck.cards[0]));
        }
      }
      return cardsDrawn;
    },
  }));
