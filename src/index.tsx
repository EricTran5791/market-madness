import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'mobx-react';
import PlayingField from './containers/PlayingField';
import { StoreType, Store } from './models/Store';
import { Player, PlayerId } from './models/Player';
import { GameStateModelType, GamePhase } from './models/GameState';
import {
  generateShopDeck,
  generateStartingDeck,
  generateEmptyDeck,
} from './utils/cardGenerator';

const players = [
  Player.create({
    id: PlayerId.Player1,
    name: 'Player 1',
    discardPile: generateEmptyDeck(),
    hand: { cardStack: generateEmptyDeck() },
    deck: generateStartingDeck(),
  }),
  Player.create({
    id: PlayerId.Computer,
    name: 'Computer',
    discardPile: generateEmptyDeck(),
    hand: { cardStack: generateEmptyDeck() },
    deck: generateStartingDeck(),
  }),
];

const gameState: GameStateModelType = {
  currentGamePhase: GamePhase.gameStart,
  currentPlayerId: players[0].id,
};

const store: StoreType = Store.create({
  shopDeck: generateShopDeck(),
  players,
  gameState,
});

ReactDOM.render(
  <Provider store={store}>
    <PlayingField name="Deck Builder" />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
