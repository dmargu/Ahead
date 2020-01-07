import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MainClassModal from './MainClassModal';
import { colors } from '../../styles';

class ClassTouchableHeader extends Component {
  constructor() {
    super();
    this.state = {
      classModalVisible: false
    };
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ classModalVisible: true })}
        >
          <Text style={styles.textStyle}>{this.props.item.name}</Text>
        </TouchableOpacity>

        <MainClassModal
          item={this.props.item}
          isVisible={this.state.classModalVisible}
          closeHandle={() => this.setState({ classModalVisible: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: colors.mainLightText
  }
});

export default ClassTouchableHeader;
