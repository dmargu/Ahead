import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodayIncludes = () => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>Today Includes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
  },
  viewStyle: {
    justifyContent: 'center',
    paddingTop: 5,
    flexDirection: 'row'
  }
});
export default TodayIncludes;
