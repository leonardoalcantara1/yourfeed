import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import Color from 'color';
import { withTheme } from '../../theme';
import { Post, Button, Loading } from '../../components';
import { getPosts, uploadPost } from '../../store/posts/actions';
import { H2, P } from '../../components/Typo';

const Avatar = styled.img`
  border-radius: 100%;
  width: 100%;
`;

const PostButton = styled.div`
  width: 100%;
`;

const ReleasePosts = styled.div`
  position: fixed;
  top: calc(${({ theme }) => theme.dimensions.header.height} + ${({ theme }) => theme.spacing});
  left: 50%;
  transform: translateX(-50%);
  z-index: 90;
  animation: toast 1s;

  @keyframes toast {
    0% {
      top: 0;
      opacity: 0;
    }

    100% {
      top: calc(${({ theme }) => theme.dimensions.header.height} + ${({ theme }) => theme.spacing});
      opacity: 1;
    }
  }
`;

const Feed = ({ user, theme, dispatch, posts }) => {
  useEffect(() => {
    dispatch(getPosts());
  }, ['']);

  let inputFile;

  return <>
    {
      !posts.loading && posts.release > 0 && (
        <ReleasePosts theme={theme}>
          <Button type="secondary" onClick={() => dispatch(getPosts())}>
            Ver {posts.release} post{posts.release > 1 && 's'} novo{posts.release > 1 && 's'}
          </Button>
        </ReleasePosts>
      )
    }
    <Grid
      container
      style={{
        alignItems: 'center',
        borderBottom: `1px solid ${Color(theme.colors.paper).darken(0.1).rgb().string()}`,
        paddingBottom: theme.spacing,
        marginBottom: `calc(${theme.spacing} / 2)`
      }}
      spacing={2}
    >
      <Grid item xs={1}>
        <Avatar src={user.photoURL || 'https://greenpointcapital.com/wp-content/uploads/2019/05/placeholder-profile.jpg'} />
      </Grid>
      <Grid item xs>
        <H2>
          Olá, {user.displayName}
        </H2>
      </Grid>
    </Grid>
    {
      posts.loading 
        ? <Loading />
        : <>
          <PostButton theme={theme}>
            <Button
              type="primary"
              style={{
                width: '100%'
              }}
              onClick={() => inputFile.click()}
            >
              NOVO POST
            </Button>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={e => {
                dispatch(uploadPost(e.target.files[0]));
              }}
              accept=".jpg,.png,.jpeg,.gif"
              ref={el => inputFile = el}
            />
          </PostButton>
          {
            posts.list.map((post, key) => <Post post={post} {...post} key={key} />)
          }
          {
            posts.list.length === 0 && (
              <Grid container>
                <P>
                  Não há postagens :(
                </P>
              </Grid>
            )
          }
        </>
    }
  </>;
}

export default connect(
  ({ user, posts }) => ({
    user,
    posts
  }),
  dispatch => ({ dispatch })
)(withTheme(Feed));
