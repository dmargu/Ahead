import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles';

const FloatingPlusButton = (props) => {
    return (
      <View style={styles.buttonStyle}>
        <TouchableOpacity onPress={props.tapToAddEvent}>
          <MaterialIcons
            name='add'
            size={25}
            color='#FFFFFF'
          />
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: colors.mainRed,
    borderRadius: 100,
    shadowColor: '#BF264C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    zIndex: 20
  }
});

export default FloatingPlusButton;
