import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'mobx-react';
import PlayingField from './containers/PlayingField';
import { initializeStore } from './utils/gameStateManager';
import DevTools from 'mobx-react-devtools';
import CardEditor from './containers/CardEditor';
import CardLibraryView from './components/CardLibraryView';
import { CardLibrary } from './models/CardLibrary';

ReactDOM.render(
  <Provider cardLibrary={CardLibrary.create()}>
    <Router>
      <>
        <Route
          exact={true}
          path="/"
          render={() => (
            <Provider store={initializeStore()}>
              <>
                <PlayingField />
                {process.env.NODE_ENV === 'development' ? <DevTools /> : ''}
              </>
            </Provider>
          )}
        />
        <Route path="/card-library" component={CardLibraryView} />
        <Route
          path="/card-editor/:cardId?"
          render={({ match }) => (
            <CardEditor cardId={match.params.cardId || ''} />
          )}
        />
      </>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
