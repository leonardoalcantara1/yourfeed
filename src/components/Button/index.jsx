import styled from 'styled-components';
import color from 'color';
import { withTheme } from '../../theme';

const getColor = ({ theme, type='neutral' }) => {
  const types = {
    primary: theme.colors.highlight,
    secondary: theme.colors.negative,
    neutral: theme.colors.texts
  };
  return types[type];
}

const Button = styled.button`
  background: ${getColor};
  color: ${({ theme }) => theme.colors.paper};
  font-size: 1.1em;
  font-family: ${({ theme }) => theme.font.titles};
  border: 0;
  border-bottom: 4px solid ${props => color(getColor(props)).darken(0.2).rgb().string()};
  border-radius: ${({ theme }) => theme.radius};
  padding: calc(${({ theme }) => theme.spacing} / 2) ${({ theme }) => theme.spacing};
  outline: none;
  margin: ${({ theme }) => theme.spacing} 0;

  &:not([disabled]) {
    cursor: pointer;
  }

  &[disabled] {
    opacity: 0.5;
    border-bottom: 0;
    transform: translateY(4px);
    background: ${props => color(getColor(props)).darken(0.2).rgb().string()};
    margin-bottom: calc(4px + ${({ theme }) => theme.spacing});
  }

  &:active {
    border-bottom: 0;
    transform: translateY(4px);
    background: ${props => color(getColor(props)).darken(0.2).rgb().string()};
    margin-bottom: calc(4px + ${({ theme }) => theme.spacing});
  }
`;

export default withTheme(Button);