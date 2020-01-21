import React, { createContext } from 'react';

export const themes = {
  colors: {
    texts: '#2E2C2F',
    paper: '#F7FAFC',
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
  transition: '0.5s'
}

const Theme = createContext(themes);
class ThemeComponent extends React.Component {
  render() {
    const { props, Component } = this.props;
    return (
      <Theme.Consumer>
        {
          theme => <Component {...props} theme={theme} />
        }
      </Theme.Consumer>
    )
  }
}

export default ThemeComponent;
