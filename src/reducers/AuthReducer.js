import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOGIN_USER
} from '../actions/types';

const initialState = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHANGED: //reset error so alert doesn't continuously pop up after changes
      return { ...state, email: action.payload, error: '' };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' };
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.payload, ...initialState };
    case USER_LOGIN_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
      //make password empty after failed attempt for better security
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    default:
      return state;
  }
};
