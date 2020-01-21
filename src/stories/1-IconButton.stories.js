import React from 'react';
import { action } from '@storybook/addon-actions';

import { IconButton } from '../components';
import { themes } from '../theme';

export default {
  title: 'IconButton',
  component: IconButton,
};

export const Like = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <IconButton onClick={action('clicked')} />
  </div>
);

export const Comment = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <IconButton type="comment" onClick={action('clicked')} />
  </div>
);

export const Share = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <IconButton type="share" onClick={action('clicked')} />
  </div>
);