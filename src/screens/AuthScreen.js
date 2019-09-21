import React, { Component } from 'react';
import LoginForm from '../components/authComponents/loginForm';

class AuthScreen extends Component {
  render() { //make this a stack navigator for proper sign in/sign up screens
    return (
      <LoginForm />
    );
  }
}

export default AuthScreen;
