import { combineReducers } from 'redux';

import loading from './loading/reducer';
import user from './user/reducer';
import posts from './posts/reducer';
import chat from './chat/reducer';

export default () =>
  combineReducers({
    loading,
    user,
    posts,
    chat
  });
