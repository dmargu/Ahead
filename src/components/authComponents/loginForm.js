import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import { Spinner } from '../common/Spinner';

const validationSchema = yup.object().shape({
  email: yup.string().email().label('Email').required(),
  password: yup.string().label('Password').required().min(6, 'Seems a bit short...')
});

class LoginForm extends Component {
  renderError() { //make keyboard hide on press would look smoother
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

  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            this.props.loginUser(values.email, values.password, actions);
            this.renderError();
          }}
        >
          {formikProps => (
            <View>
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
                  placeholderTextColor='#28313b'
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                  onChangeText={formikProps.handleChange('email')}
                />
              </View>
              <Text style={styles.textError}>{formikProps.errors.email}</Text>

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
                  placeholderTextColor='#28313b'
                  secureTextEntry
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                  onChangeText={formikProps.handleChange('password')}
                />
              </View>
              <Text style={styles.textError}>{formikProps.errors.password}</Text>

              {formikProps.isSubmitting ? (
                <TouchableHighlight
                  style={styles.buttonContainer}
                >
                  <Spinner size='large' />
                </TouchableHighlight>
              ) :
              (
                <TouchableHighlight
                  style={styles.buttonContainer}
                  onPress={formikProps.handleSubmit}
                  underlayColor={'#db5461'} //need this or else it causes bug where underlay becomes color
                >
                  <Text style={styles.signUpText}>Log In/Sign Up</Text>
                </TouchableHighlight>
              )}
            </View>
          )}
        </Formik>

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
    backgroundColor: '#db5461'
  },
  signUpText: {
    color: '#fcefef',
  },
  textError: {
    color: '#db5461',
    padding: 5
  }
});

function mapStateToProps(state) {
  return {
    error: state.AuthReducer.error,
  };
}

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, loginUser })(LoginForm);
