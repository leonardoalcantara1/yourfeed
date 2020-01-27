import * as types from './actionTypes';

const initialState = {
  chats: [],
  users: [],
  active: null
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_CHATS:
      return {
        ...state,
        chats: action.chats
      }
    case types.SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case types.SET_ACTIVE:
      return {
        ...state,
        active: action.active
      }
      
    default:
      return state;
  }
}
