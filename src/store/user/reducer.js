import * as types from './actionTypes';

const initialState = null;

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_USER:
      return action.user;
      
    default:
      return state;
  }
}
