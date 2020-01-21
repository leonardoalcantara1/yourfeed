import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import IconButton from '../IconButton';
import { P, H3 } from '../Typo';

const Wrapper = styled.div`
  margin: ${({ theme }) => theme.spacing} auto;
  max-width: 560px;
`;

const Img = styled.div`
  border-radius: calc(${({ theme }) => theme.radius} * 2);
  width: 100%;
  padding-bottom: 100%;
  background: url(${({ src }) => src}) center;
  background-size: cover;
  margin-bottom: calc(${({ theme }) => theme.spacing} / 2);
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
  img = "https://66.media.tumblr.com/8ed59d4fa4f108329e6266b23cc3a243/tumblr_oagprewYNO1tvnmj2o1_500.jpg",
  user = {
    id: '012345',
    username: 'meuteste',
    photo: 'https://greenpointcapital.com/wp-content/uploads/2019/05/placeholder-profile.jpg'
  },
  comments = [
    {
      id: '01234',
      username: 'meuteste',
      msg: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, laborum esse reiciendis maiores cumque dolorum aspernatur quidem! Pariatur, molestias in impedit et culpa ipsa odit dolor eaque perspiciatis, nobis ad!'
    }
  ]
}) => {
  return <Wrapper theme={theme}>
    <Grid container style={{ alignItems: 'center' }}>
      <Avatar src={user.photo} theme={theme} />
      <H3>
        {user.username}
      </H3>
    </Grid>
    <Img src={img} theme={theme} />
    <Grid container spacing={1}>
      <Grid item>
        <IconButton type="like" theme={theme} />
      </Grid>
      <Grid item>
        <IconButton type="comment" theme={theme} />
      </Grid>
      <Grid container item style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }} xs>
        <IconButton type="share" theme={theme} />
      </Grid>
    </Grid>
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

Post.propTypes = {
  img: PropTypes.string,
  theme: PropTypes.object,
  user: PropTypes.object,
  comments: PropTypes.array
};

export default Post;