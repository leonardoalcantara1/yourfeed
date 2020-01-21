import React from 'react';
import styled from 'styled-components';
import Theme from 'theme';

const Typo = `
  color: ${({ theme }) => theme.colors.texts}; 
`;

// ---

const H1Styled = styled.h1`
  ${Typo}
  font-family: ${({ theme }) => theme.font.titles};
`;

export const H1 = props => <Theme props={props} Component={H1Styled} />;

// ---

const H2Styled = styled.h2`
  ${Typo}
  font-family: ${({ theme }) => theme.font.titles};
`;

export const H2 = props => <Theme props={props} Component={H2Styled} />;

// ---

const H3Styled = styled.h3`
  ${Typo}
  font-family: ${({ theme }) => theme.font.texts};
`;

export const H3 = props => <Theme props={props} Component={H3Styled} />;

// ---

const H4Styled = styled.h4`
  ${Typo}
  font-family: ${({ theme }) => theme.font.texts};
`;

export const H4 = props => <Theme props={props} Component={H4Styled} />;

// ---

const H5Styled = styled.h5`
  ${Typo}
  font-family: ${({ theme }) => theme.font.texts};
`;

export const H5 = props => <Theme props={props} Component={H5Styled} />;

// ---

const PStyled = styled.p`
  ${Typo}
  font-family: ${({ theme }) => theme.font.texts};
`;

export const P = props => <Theme props={props} Component={PStyled} />;

// ---

const SpanStyled = styled.span`
  ${Typo}
`;

export const Span = props => <Theme props={props} Component={SpanStyled} />;

export default Span;