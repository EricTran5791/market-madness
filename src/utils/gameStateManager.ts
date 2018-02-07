import { StoreType, Store } from '../models/Store';
import { Player, PlayerId } from '../models/Player';
import { GameState, GamePhase } from '../models/GameState';
import {
  onAction,
  onPatch,
  getSnapshot,
  applySnapshot,
  IJsonPatch,
} from 'mobx-state-tree';
import {
  generateMarketDeck,
  generateStartingDeck,
  generateEmptyDeck,
  shuffleCardStackModel,
  generateTrashDeck,
  generateAlwaysAvailableDeck,
} from './cardGenerator';

export function initializeStore(): StoreType {
  const players = [
    Player.create({
      id: PlayerId.Player1,
      discardPile: generateEmptyDeck(),
      hand: {
        cardStack: generateEmptyDeck(),
      },
      deck: generateStartingDeck(),
    }),
    Player.create({
      id: PlayerId.Player2,
      discardPile: generateEmptyDeck(),
      hand: {
        cardStack: generateEmptyDeck(),
      },
      deck: generateStartingDeck(),
    }),
  ];

  const gameState = GameState.create({
    currentGamePhase: GamePhase.Player1Turn,
    currentPlayer: players[0],
    activeCardEffect: {
      effect: null,
      cardsToResolve: [],
    },
  });

  const store = Store.create({
    trash: { cardStack: generateTrashDeck() },
    market: {
      cardStack: generateMarketDeck(),
      alwaysAvailableCardStack: generateAlwaysAvailableDeck(),
    },
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
    switch (call.name) {
      case 'createNewGame': {
        applySnapshot(store, initialSnapshot);
        shuffleCardStackModel(store.market.cardStack);
        shuffleCardStackModel(store.currentPlayer.deck);
        shuffleCardStackModel(store.otherPlayer.deck);
        store.currentPlayer.drawFromDeck(5);
        return;
      }
      case 'endTurn': {
        store.currentPlayer.clearHand();
        store.changeCurrentPlayer();
        store.currentPlayer.drawFromDeck(5);
        return;
      }
      default:
        return;
    }
  });

  onPatch(store.players[0], call => {
    commonChecks(store, call);
  });
  onPatch(store.players[1], call => {
    commonChecks(store, call);
  });
}

/**
 * Checks the same things for both players
 */
function commonChecks(store: StoreType, call: IJsonPatch) {
  // End the game whenever a player reaches 0 health or below
  if (call.op === 'replace' && call.path === '/health' && call.value <= 0) {
    store.gameState.changeGamePhase(GamePhase.GameOver);
  }
}
