import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FloatingPlusButton = (props) => {
    return (
      <View style={styles.buttonStyle}>
        <TouchableOpacity onPress={props.tapToAddEvent}>
          <MaterialIcons
            name='add'
            size={45}
            color='#28313b'
          />
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 15,
    backgroundColor: '#db5461',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  }
});

export default FloatingPlusButton;
