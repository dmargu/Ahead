import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodayIncludes = () => { //MAKE SURE YOU CALL THE LISTS WITH THE ITEM ICON TRUE SO IT SHOWS UP
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>Today</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
    color: '#FCEFEF'
  },
  viewStyle: {
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    right: 5,
    borderBottomColor: '#6c7a86',
    borderBottomWidth: 0.25
  }
});
export default TodayIncludes;
