import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../styles';

const EmptyListComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: fonts.buttonText,
    color: colors.mainLightText,
    fontFamily: fonts.fontFamily,
  }
});

export default EmptyListComponent;
