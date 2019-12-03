import firebase from 'firebase';
import '@firebase/firestore';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from './types';
import NavigationService from '../NavigationService';

export const loginUser = (email, password, actions) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, actions))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            global.dbRoot.doc(user.user.uid).set({ email })
            .then(() => {
              loginUserSuccess(dispatch, user, actions);
            })
            .catch((e) => console.log(e));
          })
          .catch((e) => loginUserFail(dispatch, e, actions));
      });
  };
};

const loginUserFail = (dispatch, e, actions) => {
  dispatch({
    type: USER_LOGIN_FAIL,
    payload: e
  });
  actions.setSubmitting(false);
};

const loginUserSuccess = (dispatch, user, actions) => {
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: user
  });
  NavigationService.navigate('main', null);
  actions.setSubmitting(false);
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    //logout user and bring them to auth screen
    firebase.auth().signOut();
    NavigationService.navigate('auth', null);
  };
};
