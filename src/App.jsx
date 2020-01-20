import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { history } from './store/Redux';

// import Views from './views';

const App = () => (
  <BrowserRouter key="router" history={history}>
    <Switch>
      {/* <Route key="home" name="Home" exact path="/" component={Views.Home} /> */}
    </Switch>
  </BrowserRouter>
);

export default App;
