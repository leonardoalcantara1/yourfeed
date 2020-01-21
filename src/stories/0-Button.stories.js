import React from 'react';
import { action } from '@storybook/addon-actions';

import { Button } from '../components';
import { themes } from '../theme';

export default {
  title: 'Button',
  component: Button,
};

export const Neutral = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <Button onClick={action('clicked')}>Hello Button</Button>
  </div>
);

export const Primary = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <Button type="primary" onClick={action('clicked')}>Hello Button</Button>
  </div>
);

export const Secondary = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <Button type="secondary" onClick={action('clicked')}>Hello Button</Button>
  </div>
);