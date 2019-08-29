import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Spinner } from './common/Spinner';

class LoginForm extends Component {
  renderError() {
    if (this.props.error) { //if user enters wrong password it says email address is used by
      return Alert.alert( //another account. should change this to be incorrect password here
        'Error',
        this.props.error.message,
        [
          { text: 'OK' }
        ],
          { cancelable: false }
      );
    }
  }

  onButtonPress() {
    this.props.loginUser(this.props.email, this.props.password);
    this.renderError();
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <TouchableHighlight
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={this.onButtonPress.bind(this)}
        >
          <Spinner size='large' />
        </TouchableHighlight>
      );
    }
    return (
      <TouchableHighlight
        style={[styles.buttonContainer, styles.signupButton]}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={styles.signUpText}>Log In/Sign Up</Text>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={{ paddingLeft: 10 }}>
            <MaterialCommunityIcons
              name='email'
              size={30}
              color='#28313b'
            />
          </View>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            onChangeText={(text) => this.props.emailChanged(text)}
            value={this.props.email}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={{ paddingLeft: 10 }}>
            <MaterialCommunityIcons
              name='account-key'
              size={30}
              color='#28313b'
            />
          </View>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            onChangeText={(password) => this.props.passwordChanged(password)}
            value={this.props.password}
          />
        </View>

        {this.renderButton()}

        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#fcefef',
      borderRadius: 30,
      borderBottomWidth: 1,
      width: 250,
      height: 45,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center'
  },
  inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: '#FFFFFF',
      flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: '#db5461',
  },
  signUpText: {
    color: '#fcefef',
  }
});

function mapStateToProps(state) {
  return {
    email: state.AuthReducer.email,
    password: state.AuthReducer.password,
    error: state.AuthReducer.error,
    loading: state.AuthReducer.loading
  };
}

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, loginUser })(LoginForm);
