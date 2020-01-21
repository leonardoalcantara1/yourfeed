import React from 'react';
import Theme from 'theme';

import ButtonComponent from './Button';
import IconButtonComponent from './IconButton';
import TypoComponent from './Typo';
import PostComponent from './Post';

export const Button = props => <Theme props={props} Component={ButtonComponent} />;
export const IconButton = props => <Theme props={props} Component={IconButtonComponent} />;
export const Typo = props => <Theme props={props} Component={TypoComponent} />;
export const Post = props => <Theme props={props} Component={PostComponent} />;
