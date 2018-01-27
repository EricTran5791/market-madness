import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'mobx-react';
import PlayingField from './containers/PlayingField';
import { StoreType, Store } from './models/Store';
import {
  generateStartingDeck,
  generateShopDeck,
  generateEmptyDeck,
} from './utils/cardGenerator';

const store: StoreType = Store.create({
  deck: generateStartingDeck(),
  shopDeck: generateShopDeck(),
  hand: { cardStack: generateEmptyDeck() },
  discardPile: generateEmptyDeck(),
});

ReactDOM.render(
  <Provider store={store}>
    <PlayingField name="Deck Builder" />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
