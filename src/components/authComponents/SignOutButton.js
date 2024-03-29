import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { colors, fonts } from '../../styles';

class SignOutButton extends Component {
  onButtonPress() {
    this.props.logoutUser();
  }
  renderButton() {
    return (
      <TouchableHighlight
        style={[styles.buttonContainer, styles.signupButton]}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={styles.signUpText}>Log Out</Text>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: colors.mainRed,
  },
  signUpText: {
    color: colors.white,
    fontSize: fonts.buttonText,
    fontFamily: fonts.fontFamily
  }
});

export default connect(null, { logoutUser })(SignOutButton);
