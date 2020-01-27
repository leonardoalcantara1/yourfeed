import React from 'react';
// import { action } from '@storybook/addon-actions';

import {
  H1,
  H2,
  H3,
  H4,
  H5,
  P,
  Span
} from '../components/Typo';
import { themes } from '../theme';

export default {
  title: 'Typography',
  component: Span,
};

export const Heading1 = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <H1>
      Heading #1
    </H1>
  </div>
);

export const Heading2 = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <H2>
      Heading #2
    </H2>
  </div>
);

export const Heading3 = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <H3>
      Heading #3
    </H3>
  </div>
);

export const Heading4 = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <H4>
      Heading #4
    </H4>
  </div>
);

export const Heading5 = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <H5>
      Heading #5
    </H5>
  </div>
);

export const Paragraph = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <P>
      Aliqua in voluptate aliqua ut laboris cillum aute nulla nulla eu voluptate. Id qui eu do est occaecat elit ad. Laboris sit pariatur labore duis officia dolore incididunt aute qui irure dolore commodo quis. Velit eiusmod id occaecat pariatur exercitation deserunt consectetur nostrud et aliquip nisi dolor fugiat quis. Reprehenderit commodo tempor culpa commodo enim exercitation est incididunt reprehenderit Lorem. Ea tempor aliquip ut commodo ut ut proident minim exercitation id incididunt exercitation. Eiusmod ea id aliqua incididunt fugiat exercitation eu nisi elit occaecat.
    </P>
  </div>
);

export const DefaultComponent = () => (
  <div style={{ fontSize: themes.font.size, fontFamily: themes.font.text }}>
    <Span>
      Default typography component.
    </Span>
  </div>
);