import React from 'react';
import styled from 'styled-components';
import {
  Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import Color from 'color';
import { withTheme } from '../../theme';
import { Post, Button } from '../../components';
import { H2 } from '../../components/Typo';

const Avatar = styled.img`
  border-radius: 100%;
  width: 100%;
`;

const PostButton = styled.div`
  position: fixed;
  bottom: calc(${({ theme }) => theme.spacing} / 2);
  left: 50%;
  transform: translateX(-50%);
  z-index: 90;
`;

const Feed = ({ user, theme }) => {
  return <>
    <Grid
      container
      style={{
        alignItems: 'center',
        borderBottom: `1px solid ${Color(theme.colors.paper).darken(0.1).rgb().string()}`,
        paddingBottom: theme.spacing,
        marginBottom: `calc(${theme.spacing} * 2)`
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
    <PostButton theme={theme}>
      <Button
        type="primary"
        style={{
          borderRadius: '100%',
          width: 50,
          height: 50
        }}
      >
        +
      </Button>
    </PostButton>
    <Post />
    <Post />
  </>;
}

export default connect(
  ({ user }) => ({
    user
  })
)(withTheme(Feed));
