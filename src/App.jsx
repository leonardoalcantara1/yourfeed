import React, {
  useEffect,
  // useState
} from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Grid,
  // TextField
} from '@material-ui/core';
// import {
//   ArrowBack,
//   Forum
// } from '@material-ui/icons';
import { history } from './store';
import { withTheme, GlobalStyle, themes } from './theme';
import styled from 'styled-components';
import Color from 'color';
import { connect } from 'react-redux';

import { Login, Register, Feed } from './views';
import { listenerLogin } from './store/user/actions';
import { listenerNewPosts } from './store/posts/actions';
// import { setActiveChat, sendMessage } from './store/chat/actions';
import { Loading } from './components';
// import { H2, P, H4, H3 } from './components/Typo';

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
  /* @media (min-width: 769px) {
    max-width: calc(100% - ${({ theme }) => theme.dimensions.chatAside.width});
  } */
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

const FeedArea = styled.div`
  width: 100%;
  /* @media (min-width: 769px) {
    max-width: calc(100% - ${({ theme }) => theme.dimensions.chatAside.width});
  } */
`;

// const Aside = styled.aside`
//   width: 100%;
//   height: 100vh;
//   background: ${({ theme }) => Color(theme.colors.paper).lighten(1).rgb().string()};
//   position: fixed;
//   right: 0;
//   top: 0;
//   z-index: 110;
//   padding: ${({ theme }) => theme.spacing};
//   @media (min-width: 769px) {
//     width: ${({ theme }) => theme.dimensions.chatAside.width};
//     box-shadow: -2px 0 5px ${({ theme }) => Color(theme.colors.paper).darken(0.15).rgb().string()};
//   }
// `;

// const Avatar = styled.img`
//   border-radius: 100%;
//   width: 100%;
//   margin-top: 4px;
// `;

// const ChatItem = styled.div`
//   cursor: pointer;
//   padding: ${({ theme }) => theme.spacing};
//   &:active {
//     background: ${({ theme }) => theme.colors.paper};
//   }
// `;

// const ChatContainer = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   padding: 0 6px;
//   .chat-header {
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 60px;
//     width: 100%;
//     display: flex;
//     align-items: center;
//     & > * {
//       margin-left: 6px;
//       margin-right: 6px;
//     }
//   }
//   .chat-msgs {
//     position: absolute;
//     top: 60px;
//     left: 0;
//     height: calc(100% - 130px);
//     width: 100%;
//     overflow-y: scroll;
//     padding: 6px;
//     .msg {
//       border-radius: 4px;
//       padding: ${({ theme }) => theme.spacing};
//       margin: 6px 0;
//       max-width: 80%;
//       clear: both;
//       &.left {
//         float: left;
//         background: ${({ theme }) => theme.colors.texts};
//         color: ${({ theme }) => theme.colors.paper};
//       }
//       &.right {
//         float: right;
//         background: ${({ theme }) => theme.colors.paper};
//         color: ${({ theme }) => theme.colors.texts};
//       }
//     }
//   }
//   .chat-input {
//     position: absolute;
//     bottom: 0;
//     height: 70px;
//     left: 0;
//     width: 100%;
//     padding: 0 6px;
//     display: flex;
//     align-items: center;
//   }
// `;

// let chatContainer;

const App = props => {
  const {
    user,
    loading,
    dispatch,
    // chat
  } = props;

  // const [msg, setMsg] = useState('');

  useEffect(
    () => {
      dispatch(listenerLogin());
      dispatch(listenerNewPosts());
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
    {/*     
    <Aside theme={props.theme}>
      {
        props.chat.active
        ? <>
          <ChatContainer theme={props.theme}>
            <div className="chat-header">
              <Grid item xs={1}>
                <ArrowBack style={{ cursor: 'pointer' }} onClick={() => dispatch(setActiveChat(null))} />
              </Grid>
              <Grid item style={{
                width: 40
              }}>
                <Avatar src={props.chat.active.secondaryPhoto} />
              </Grid>
              <Grid item xs>
                <H2>
                  {props.chat.active.secondaryFeedname}
                </H2>
              </Grid>
            </div>
            <div className="chat-msgs" ref={el => chatContainer = el}>
              {
                props.chat.active.messages.map((msg, key) => (
                  <div key={key} className={`msg ${msg.user.uid === user.uid ? 'right' : 'left'}`}>{msg.msg}</div>
                ))
              }
            </div>
            <div className="chat-input">
              <TextField
                variant="outlined"
                label="Mensagem"
                fullWidth
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    dispatch(sendMessage(e.target.value, chatContainer));
                    setMsg('');
                  }
                }}
              />
            </div>
          </ChatContainer>
        </>
        : <>
          <H2
            style={{
              fontWeight: 'normal',
              textAlign: 'center',
              height: props.theme.dimensions.header.height,
              lineHeight: props.theme.dimensions.header.height
            }}
          >
            Mensagens
          </H2>
          {
            chat.chats.length > 0
              ? chat.chats.map((chat, key) => (
                <ChatItem key={key} theme={props.theme} onClick={() => dispatch(setActiveChat(chat))}>
                  <Grid container spacing={2} style={{ alignItems: 'center' }}>
                    <Grid item xs={2}>
                      <Avatar src={chat.owner === user.uid ? chat.secondaryPhoto : chat.ownerPhoto} />
                    </Grid>
                    <Grid item xs>
                      <H3>
                        {chat.owner === user.uid ? chat.secondaryFeedname : chat.ownerFeedname}
                      </H3>
                    </Grid>
                  </Grid>
                </ChatItem>
              ))
              : (
                <P style={{ textAlign: 'center', margin: `${props.theme.spacing} 0`, padding: `${props.theme.spacing} 0` }}>
                  Nenhuma conversa :(
                </P>
              )
          }
          {
            chat.users.length > 0 && <>
              <H4 style={{ textAlign: 'center', marginBottom: props.theme.spacing }}>
                Converse com
              </H4>
              {
                chat.users.map((secondaryUser, key) => (
                  <ChatItem key={key} theme={props.theme} onClick={() => dispatch(setActiveChat({
                    owner: user.uid,
                    secondary: secondaryUser.uid,
                    secondaryPhoto: secondaryUser.photoURL,
                    secondaryFeedname: secondaryUser.feedname,
                    ownerPhoto: user.photoURL,
                    ownerFeedname: user.feedname,
                    messages: []
                  }))}>
                    <Grid container spacing={2} style={{ alignItems: 'center' }}>
                      <Grid item xs={2}>
                        <Avatar src={secondaryUser.photoURL} />
                      </Grid>
                      <Grid item xs>
                        <H3>
                          {secondaryUser.feedname}
                        </H3>
                      </Grid>
                    </Grid>
                  </ChatItem>
                ))
              }
            </>
          }
        </>
      }
    </Aside>
     */}
    <Grid container>
      <FeedArea theme={props.theme}>
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
      </FeedArea>
    </Grid>
  </ThemeProvider>;
}

export default withTheme(connect(
  ({ user, loading, chat }) => ({
    user,
    loading,
    chat
  }),
  dispatch => ({
    dispatch
  })
)(App));
