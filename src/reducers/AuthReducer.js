import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/types';

const initialState = {
  user: null,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.payload, ...initialState };
    case USER_LOGIN_FAIL:
      return { ...state, error: action.payload };
    case LOGIN_USER:
      return { ...state, error: '' };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
};
