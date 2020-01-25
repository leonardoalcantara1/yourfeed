import React, { createContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';

export const themes = {
  colors: {
    texts: '#2E2C2F',
    paper: '#F9F9F9',
    highlight: '#729B79',
    subHighlight: '#BACDB0',
    negative: '#475B63'
  },
  font: {
    titles: 'Roboto Slab, serif',
    text: 'Montserrat, sans-serif',
    size: '14px'
  },
  spacing: '16px',
  radius: '4px',
  transition: '0.5s',
  dimensions: {
    header: {
      height: '40px'
    }
  }
}

export const GlobalStyle = createGlobalStyle`
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  html, body {
    background: ${themes.colors.paper};
  }

  body {
    padding-top: calc(${themes.dimensions.header.height} + ${themes.spacing} * 2);
  }
`;

export const Theme = createContext(themes);

export const withTheme = Component => {
  class ThemeComponent extends React.Component {
    render() {
      return (
        <Theme.Consumer>
          {
            theme => <Component {...this.props} theme={theme}>
              {this.props.children}
            </Component>
          }
        </Theme.Consumer>
      )
    }
  }
  ThemeComponent.propTypes = {
    children: PropTypes.any
  }
  return ThemeComponent;
}

export default Theme;
