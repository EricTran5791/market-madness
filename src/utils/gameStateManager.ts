import { StoreType, Store } from '../models/Store';
import { Player, PlayerId } from '../models/Player';
import { GameState, GamePhase } from '../models/GameState';
import { onAction, onPatch, getSnapshot, applySnapshot } from 'mobx-state-tree';
import {
  generateMarketDeck,
  generateStartingDeck,
  generateEmptyDeck,
  shuffleCardStackModel,
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
    currentGamePhase: GamePhase.PlayersTurn,
    currentPlayer: players[0],
  });

  const store = Store.create({
    market: { cardStack: generateMarketDeck() },
    players,
    gameState,
  });

  setupReactions(store);
  store.createNewGame();
  return store;
}

function setupReactions(store: StoreType) {
  const initialSnapshot = getSnapshot(store);

  onAction(store, call => {
    if (call.name === 'createNewGame') {
      applySnapshot(store, initialSnapshot);
      shuffleCardStackModel(store.market.cardStack);
      shuffleCardStackModel(store.currentPlayer.deck);
      shuffleCardStackModel(store.otherPlayer.deck);
      store.currentPlayer.drawFromDeck(5);
    }

    if (call.name === 'endTurn') {
      store.currentPlayer.clearHand();
      store.changeCurrentPlayer();
      store.currentPlayer.drawFromDeck(5);
    }
  });

  // End the game whenever either player reaches 0 health or below
  onPatch(store.players[0], call => {
    if (call.op === 'replace' && call.path === '/health' && call.value <= 0) {
      console.log('game over');
      store.gameState.currentGamePhase = GamePhase.GameOver;
    }
  });
  onPatch(store.players[1], call => {
    if (call.op === 'replace' && call.path === '/health' && call.value <= 0) {
      console.log('game over');
      store.gameState.currentGamePhase = GamePhase.GameOver;
    }
  });
}
