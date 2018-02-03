import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'mobx-react';
import PlayingField from './containers/PlayingField';
import { initializeStore } from './utils/gameStateManager';
import DevTools from 'mobx-react-devtools';

ReactDOM.render(
  <Provider store={initializeStore()}>
    <>
      <PlayingField />
      {process.env.NODE_ENV === 'development' ? <DevTools /> : ''}
    </>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
