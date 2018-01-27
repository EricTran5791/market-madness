import { types, detach } from 'mobx-state-tree';
import { CardStack, CardModelType } from './Card';
import { GameState, GamePhase } from './GameState';
import { Player } from './Player';

export const Store = types
  .model('Store', {
    shopDeck: CardStack,
    players: types.array(Player),
    gameState: GameState,
  })
  .views(self => ({
    getPlayer(id: string) {
      return self.players.find(player => player.id === id);
    },
    get currentPlayer() {
      return self.players.find(
        player => player.id === self.gameState.currentPlayerId
      );
    },
    get currentGamePhase() {
      return self.gameState.currentGamePhase;
    },
  }))
  .actions(self => ({
    buyShopCard(card: CardModelType) {
      if (self.currentPlayer.hand.spendBuyingPower(card.cost)) {
        self.gameState.addGameLogEntry('buy', card.name);
        self.currentPlayer.discardPile.add(detach(card));
      }
    },
    moveToHand(card: CardModelType) {
      self.currentPlayer.hand.cardStack.add(detach(card));
    },
    moveToDeck(card: CardModelType) {
      self.currentPlayer.deck.add(detach(card));
    },
    clearPlayerHand() {
      // Put hand into discard pile
      self.currentPlayer.hand.cardStack.cards.forEach(card => {
        self.currentPlayer.discardPile.add(detach(card));
      });
      // Reset hand stats
      self.currentPlayer.hand.spentBuyingPower = 0;
      self.currentPlayer.hand.spentAttackValue = 0;
    },
    drawFromDeck(numToDraw: number) {
      // Draw up to x cards from the deck
      const numDeckDraws = Math.min(
        self.currentPlayer.deck.cards.length,
        numToDraw
      );
      for (let i = 0; i < numDeckDraws; i++) {
        self.currentPlayer.hand.cardStack.add(
          detach(self.currentPlayer.deck.cards[0])
        );
      }

      // If there aren't enough cards in the deck:
      // 1) We shuffle the discard pile
      // 2) Move the discard pile into the deck
      // 3) Draw the remaining amount
      const remainingDeckDraws = numToDraw - numDeckDraws;
      if (remainingDeckDraws > 0) {
        const discardPile = self.currentPlayer.discardPile.cards;

        // Shuffle the discard pile
        for (let i = discardPile.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          discardPile.move(i, j);
        }

        // Move the discard pile to the deck
        self.currentPlayer.discardPile.cards.forEach(card => {
          self.currentPlayer.deck.add(detach(card));
        });
      }

      // Draw the remaining amount of cards
      for (let i = 0; i < remainingDeckDraws; i++) {
        self.currentPlayer.hand.cardStack.add(
          detach(self.currentPlayer.deck.cards[0])
        );
      }
    },
    changeCurrentPlayer() {
      self.gameState.currentPlayerId = self.players.find(
        player => player.id !== self.gameState.currentPlayerId
      ).id;
    },
    startGame() {
      self.gameState.currentGamePhase = GamePhase.turnStart;
    },
    endTurn() {
      self.gameState.currentGamePhase = GamePhase.turnEnd;
    },
  }));

export type StoreType = typeof Store.Type;
