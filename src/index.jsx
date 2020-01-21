import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Theme from './theme';
import * as serviceWorker from './serviceWorker';

import { store } from './store/Redux';

ReactDOM.render(
  <Provider store={store}>
    <Theme>
      {
        theme => (
          <div style={{ fontSize: theme.font.size, fontFamily: theme.font.text }}>
            <App />
          </div>
        )
      }
    </Theme>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
