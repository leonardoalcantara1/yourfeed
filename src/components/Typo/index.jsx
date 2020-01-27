import styled from 'styled-components';
import { withTheme } from '../../theme';

const Typo = `
  color: ${({ theme }) => theme.colors.texts}; 
`;

export const H1 = withTheme((styled.h1`
  ${Typo}
  font-family: ${({ theme }) => theme.font.titles};
`));

export const H2 = withTheme((styled.h2`
  ${Typo}
  font-family: ${({ theme }) => theme.font.titles};
`));

export const H3 = withTheme((styled.h3`
  ${Typo}
  font-family: ${({ theme }) => theme.font.texts};
`));

export const H4 = withTheme((styled.h4`
  ${Typo}
  font-family: ${({ theme }) => theme.font.texts};
`));

export const H5 = withTheme((styled.h5`
  ${Typo}
  font-family: ${({ theme }) => theme.font.texts};
`));

export const P = withTheme((styled.p`
  ${Typo}
  font-family: ${({ theme }) => theme.font.texts};
`));

export const Span = withTheme((styled.span`
  ${Typo}
`));

export default Span;