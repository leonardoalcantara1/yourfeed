import * as types from './actionTypes';

const initialState = true;

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}
