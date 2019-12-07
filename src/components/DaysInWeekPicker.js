import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';

const DaysInWeekPicker = (props) => {
    const daysOfWeek = props.formikProps.values.daysOfWeek;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => props.formikProps.setFieldValue('daysOfWeek.m', !daysOfWeek.m)}
        >
          <View
            style={[styles.dayBox, {
              backgroundColor: daysOfWeek.m ? '#82ff9e' : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.m ? '#28313b' : '#fcefef'
              }]}
            >
              M
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => props.formikProps.setFieldValue('daysOfWeek.t', !daysOfWeek.t)}
        >
          <View
            style={[styles.dayBox, {
              backgroundColor: daysOfWeek.t ? '#82ff9e' : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.t ? '#28313b' : '#fcefef'
              }]}
            >
              T
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => props.formikProps.setFieldValue('daysOfWeek.w', !daysOfWeek.w)}
        >
          <View
            style={[styles.dayBox, {
              backgroundColor: daysOfWeek.w ? '#82ff9e' : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.w ? '#28313b' : '#fcefef'
              }]}
            >
              W
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => props.formikProps.setFieldValue('daysOfWeek.r', !daysOfWeek.r)}
        >
          <View
            style={[styles.dayBox, {
              backgroundColor: daysOfWeek.r ? '#82ff9e' : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.r ? '#28313b' : '#fcefef'
              }]}
            >
              R
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => props.formikProps.setFieldValue('daysOfWeek.f', !daysOfWeek.f)}
        >
          <View
            style={[styles.dayBox, {
              backgroundColor: daysOfWeek.f ? '#82ff9e' : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.f ? '#28313b' : '#fcefef'
              }]}
            >
              F
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => props.formikProps.setFieldValue('daysOfWeek.sa', !daysOfWeek.sa)}
        >
          <View
            style={[styles.dayBox, {
              backgroundColor: daysOfWeek.sa ? '#82ff9e' : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.sa ? '#28313b' : '#fcefef'
              }]}
            >
              Sa
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => props.formikProps.setFieldValue('daysOfWeek.su', !daysOfWeek.su)}
        >
          <View
            style={[styles.dayBox, {
              backgroundColor: daysOfWeek.su ? '#82ff9e' : null,
              borderRightWidth: 0
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.su ? '#28313b' : '#fcefef'
              }]}
            >
              Su
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#fcefef',
    flexDirection: 'row',
    width: 325,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBox: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#fcefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    paddingTop: 8,
  }
});

export default DaysInWeekPicker;
