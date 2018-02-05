import { types, detach, getParent } from 'mobx-state-tree';
import { Hand } from './Hand';
import { CardStack } from './Card';
import { shuffleCardStackModel } from '../utils/cardGenerator';
import { GameLogEntryCategory } from './GameState';
import { StoreType } from './Store';

export enum PlayerId {
  Player1 = 'Player 1',
  Player2 = 'Player 2',
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
      self.health += amtHealed;
      return amtHealed;
    },
    increaseMaxHealth(value: number) {
      self.maxHealth += value;
    },
    attackOtherPlayer() {
      const store: StoreType = getParent(getParent(self));
      const hand = self.hand;
      const availableAttackValue = hand.availableAttackValue;
      if (
        availableAttackValue > 0 &&
        hand.spendAttackValue(availableAttackValue)
      ) {
        store.otherPlayer.takeDamage(availableAttackValue);
      }
    },
    takeDamage(value: number) {
      self.health -= value;

      const store: StoreType = getParent(getParent(self));
      store.gameState.addGameLogEntry(GameLogEntryCategory.Attack, {
        targets: [store.otherPlayer.id],
        value: value,
      });
    },
    clearHand() {
      // Put hand into discard pile
      self.hand.cardStack.cards.forEach(card => {
        self.discardPile.add(detach(card));
      });
      // Put gained cards into discard pile
      self.hand.gainedCardStack.cards.forEach(card => {
        self.discardPile.add(detach(card));
      });
      // Reset hand stats
      self.hand.availableBuyingPower = 0;
      self.hand.spentBuyingPower = 0;
      self.hand.availableAttackValue = 0;
      self.hand.spentAttackValue = 0;
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

        // Move gained cards to the discard pile... TODO: Gained cards should always be in the discard pile
        self.hand.gainedCardStack.cards.forEach(card => {
          self.discardPile.add(detach(card));
        });
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

export type PlayerModelType = typeof Player.Type;
