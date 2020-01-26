import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { history } from './store';
import { withTheme, GlobalStyle, themes } from './theme';
import styled from 'styled-components';
import Color from 'color';
import { connect } from 'react-redux';

import { Login, Register, Feed } from './views';
import { listenerLogin } from './store/user/actions';
import { Loading } from './components';

const Header = styled.header`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => Color(theme.colors.paper).lighten(1).rgb().string()};
  box-shadow: 0 2px 5px ${({ theme }) => Color(theme.colors.paper).darken(0.15).rgb().string()};
`;

const Logo = styled.span`
  font-size: 1.6em;
  font-family: ${({ theme }) => theme.font.titles};
  b {
    font-weight: 900;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing} ${({ theme }) => theme.spacing} calc(${({ theme }) => theme.spacing} * 2);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  .wrapper {
    width: 100%;
    max-width: 560px;
  }
`;

const MaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: themes.colors.highlight
    },
    secondary: {
      main: themes.colors.subHighlight
    }
  }
});

const App = props => {
  const { user, loading, dispatch } = props;

  useEffect(
    () => {
      dispatch(listenerLogin());
    },
    ['']
  );

  return <ThemeProvider theme={MaterialTheme}>
    <GlobalStyle />
    <Header theme={props.theme}>
      <Logo theme={props.theme}>
        YOUR<b>FEED</b>
      </Logo>
    </Header>
    <Content theme={props.theme}>
      {
        loading
        ? <Loading />
        : (
          <div className="wrapper" style={{ display: 'initial' }}>
            <BrowserRouter key="router" history={history}>
              <Switch>
                {
                  user
                    ? user.feedname && <Route key="home" name="Home" exact path="/" component={Feed} />
                    : <Route key="login" name="Login" exact path="/" component={Login} />
                }
                {
                  (user && !user.feedname)
                    ? <>
                      <Route key="register" name="Register" exact path="/register" component={Register} />
                      <Redirect to="/register" />
                    </>
                    : <Redirect to="/" />
                }
              </Switch>
            </BrowserRouter>
          </div>
        )
      }
    </Content>
  </ThemeProvider>;
}

export default withTheme(connect(
  ({ user, loading }) => ({
    user,
    loading
  }),
  dispatch => ({
    dispatch
  })
)(App));
