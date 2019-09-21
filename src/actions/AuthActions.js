import firebase from 'firebase';
import '@firebase/firestore';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from './types';
import NavigationService from '../NavigationService';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            global.dbRoot.doc(user.user.uid).set({ email })
            .then(() => {
              loginUserSuccess(dispatch, user);
            })
            .catch((e) => console.log(e));
          })
          .catch((e) => loginUserFail(dispatch, e));
      });
  };
};

const loginUserFail = (dispatch, e) => {
  dispatch({
    type: USER_LOGIN_FAIL,
    payload: e
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: user
  });
  NavigationService.navigate('main', null);
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    //logout user and bring them to auth screen
    firebase.auth().signOut();
    NavigationService.navigate('auth', null);
  };
};
