import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const DaysInWeekPicker = () => { //add some props to conditionally change background color and stuff
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 1 }}>
        <View style={styles.dayBox}>
          <Text style={styles.textStyle}>M</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1 }}>
        <View style={styles.dayBox}>
          <Text style={styles.textStyle}>T</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1 }}>
        <View style={styles.dayBox}>
          <Text style={styles.textStyle}>W</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1 }}>
        <View style={styles.dayBox}>
          <Text style={styles.textStyle}>R</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1 }}>
        <View style={styles.dayBox}>
          <Text style={styles.textStyle}>F</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1 }}>
        <View style={styles.dayBox}>
          <Text style={styles.textStyle}>Sa</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1 }}>
        <View style={[styles.dayBox, { borderRightWidth: 0 }]}>
          <Text style={styles.textStyle}>Su</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    width: 325,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBox: {
    flex: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    paddingTop: 8
  }
});

export default DaysInWeekPicker;
