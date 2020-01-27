import * as types from './actionTypes';

const initialState = {
  list: [],
  release: 0,
  loading: false
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.STORE_POSTS:
      return {
        ...state,
        list: action.posts
      }
    case types.RELEASE_POSTS:
      return {
        ...state,
        release: action.release
      }
    case types.LOADING_POSTS:
      return {
        ...state,
        loading: action.postsLoading
      }
      
    default:
      return state;
  }
}
