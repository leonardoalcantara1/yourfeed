import { combineReducers } from 'redux';

import loading from './loading/reducer';
import users from './users/reducer';

export default () =>
  combineReducers({
    loading,
    users
  });
