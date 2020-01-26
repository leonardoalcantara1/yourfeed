import { combineReducers } from 'redux';

import loading from './loading/reducer';
import user from './user/reducer';

export default () =>
  combineReducers({
    loading,
    user
  });
