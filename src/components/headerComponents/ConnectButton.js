import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ConnectModal from '../modals/ConnectModal';
import { colors, fonts } from '../../styles';

class ConnectButton extends Component {
  constructor() {
    super();
    this.state = {
      connectModalVisible: false
    };
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ connectModalVisible: true })}>
          <Text style={styles.text}>C</Text>
        </TouchableOpacity>
        <ConnectModal
          isVisible={this.state.connectModalVisible}
          closeHandle={() => this.setState({ connectModalVisible: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: colors.mainLightText,
    fontFamily: fonts.fontFamily,
    fontSize: fonts.headerText,
    fontWeight: 'bold'
  }
});

export default ConnectButton;
