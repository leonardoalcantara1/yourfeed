import React from 'react';
// import { action } from '@storybook/addon-actions';

import { Post } from '../components';
import { themes } from '../theme';

export default {
  title: 'Post',
  component: Post,
};

export const Card = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <Post />
  </div>
);