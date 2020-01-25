import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { Theme } from './theme';
import * as serviceWorker from './serviceWorker';

import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <Theme.Consumer>
      {
        theme => (
          <div style={{ fontSize: theme.font.size, fontFamily: theme.font.text }}>
            <App />
          </div>
        )
      }
    </Theme.Consumer>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();