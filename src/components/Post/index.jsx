import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import IconButton from '../IconButton';
import { P, H3 } from '../Typo';

import { withTheme } from '../../theme';

const Wrapper = styled.div`
  margin: ${({ theme }) => theme.spacing} auto calc(${({ theme }) => theme.spacing} * 3);
  max-width: 560px;
`;

const Img = styled.div`
  border-radius: calc(${({ theme }) => theme.radius} * 2);
  width: 100%;
  padding-bottom: 100%;
  background: url(${({ src }) => src}) center;
  background-size: cover;
  margin: calc(${({ theme }) => theme.spacing} / 2) 0;
`;

const Comment = styled.div`
  margin: ${({ theme }) => theme.spacing} 0;
`;

const Avatar = styled.div`
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;
  border-radius: 100%;
  width: calc(${({ theme }) => theme.spacing} * 2);
  height: calc(${({ theme }) => theme.spacing} * 2);
  margin-right: ${({ theme }) => theme.spacing};
`;

const Post = ({
  theme,
  img,
  user,
  comments = [],
  // likes,
}) => {
  return <Wrapper theme={theme}>
    <Grid container style={{ alignItems: 'center' }}>
      <Avatar src={user.photoURL} theme={theme} />
      <H3>
        {user.feedname}
      </H3>
    </Grid>
    <Img src={img} theme={theme} />
    {/* <Grid container spacing={1} style={{ padding: `calc(${theme.spacing} / 2) 0` }}>
      <Grid item>
        <IconButton type="like" theme={theme} />
      </Grid>
      <Grid item>
        <IconButton type="comment" theme={theme} />
      </Grid>
      <Grid container item style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }} xs>
        <IconButton type="share" theme={theme} />
      </Grid>
    </Grid> */}
    {
      comments && comments.length > 0 && comments.map(
        item => <Comment key={item.id}>
          <P theme={theme}>
            <b>{item.username}</b> {item.msg}
          </P>
        </Comment>
      )
    }
  </Wrapper>;
}

export default withTheme(Post);