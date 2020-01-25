import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { history } from './store';
import { withTheme, GlobalStyle, themes } from './theme';
import styled from 'styled-components';
import Color from 'color';
import { useStore } from 'react-redux';
import { Login, Register, Feed } from './views';
// import { Loading } from './components';

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
  padding: ${({ theme }) => theme.spacing};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  .wrapper {
    width: 100%;
    max-width: 600px;
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
  const { user } = useStore().getState();
  return <ThemeProvider theme={MaterialTheme}>
    <GlobalStyle />
    <Header theme={props.theme}>
      <Logo theme={props.theme}>
        YOUR<b>FEED</b>
      </Logo>
    </Header>
    <Content theme={props.theme}>
      {/* <Loading /> */}
      <div className="wrapper" style={{ display: 'initial' }}>
        <BrowserRouter key="router" history={history}>
          <Switch>
            {
              user
                ? <Route key="home" name="Home" exact path="/" component={Feed} />
                : <Route key="login" name="Login" exact path="/" component={Login} />
            }

            <Route key="register" name="Register" exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    </Content>
  </ThemeProvider>;
}

export default withTheme(App);
