import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { colors, fonts } from '../styles';

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
              backgroundColor: daysOfWeek.m ? colors.green : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.m ? colors.mainDark : colors.white
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
              backgroundColor: daysOfWeek.t ? colors.green : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.t ? colors.mainDark : colors.white
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
              backgroundColor: daysOfWeek.w ? colors.green : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.w ? colors.mainDark : colors.white
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
              backgroundColor: daysOfWeek.r ? colors.green : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.r ? colors.mainDark : colors.white
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
              backgroundColor: daysOfWeek.f ? colors.green : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.f ? colors.mainDark : colors.white
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
              backgroundColor: daysOfWeek.sa ? colors.green : null
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.sa ? colors.mainDark : colors.white
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
              backgroundColor: daysOfWeek.su ? colors.green : null,
              borderRightWidth: 0
            }]}
          >
            <Text
              style={[styles.textStyle, {
                color: daysOfWeek.su ? colors.mainDark : colors.white
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
    borderColor: colors.white,
    flexDirection: 'row',
    width: 325,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBox: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    paddingTop: 8,
    fontSize: fonts.buttonText,
    fontFamily: fonts.fontFamily
  }
});

export default DaysInWeekPicker;
