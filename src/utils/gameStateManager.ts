import { StoreType, Store } from '../models/Store';
import { Player, PlayerId } from '../models/Player';
import { GameState, GamePhase } from '../models/GameState';
import { onAction } from 'mobx-state-tree';
import {
  generateMarketDeck,
  generateStartingDeck,
  generateEmptyDeck,
} from './cardGenerator';

export function initializeStore(): StoreType {
  const players = [
    Player.create({
      id: PlayerId.Player1,
      discardPile: generateEmptyDeck(),
      hand: {
        cardStack: generateEmptyDeck(),
        gainedCardStack: generateEmptyDeck(),
      },
      deck: generateStartingDeck(),
    }),
    Player.create({
      id: PlayerId.Computer,
      discardPile: generateEmptyDeck(),
      hand: {
        cardStack: generateEmptyDeck(),
        gainedCardStack: generateEmptyDeck(),
      },
      deck: generateStartingDeck(),
    }),
  ];

  const gameState = GameState.create({
    currentGamePhase: GamePhase.gameStart,
    currentPlayer: players[0],
  });

  const store = Store.create({
    market: { cardStack: generateMarketDeck() },
    players,
    gameState,
  });

  setupReactions(store);
  store.startGame();
  return store;
}

function setupReactions(store: StoreType) {
  onAction(store, call => {
    if (call.name === 'startGame') {
      store.currentPlayer.drawFromDeck(5);
    }

    if (call.name === 'endTurn') {
      store.currentPlayer.clearHand();
      store.changeCurrentPlayer();
      store.currentPlayer.drawFromDeck(5);
    }
  });
}
