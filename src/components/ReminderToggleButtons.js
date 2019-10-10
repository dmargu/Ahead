import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  tenMinReminder,
  thirtyMinReminder,
  oneHourReminder,
  oneDayReminder,
  startReminder
} from '../actions/ReminderActions';

class ReminderToggleButtons extends Component {
  render() {
    const item = this.props.item;
    const colors = {
      gunmetal: '#28313b',
      red: '#db5461',
      green: '#82ff9e'
    };
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.startReminder ? colors.gunmetal : colors.red,
              backgroundColor: item.startReminder ? colors.green : null
            }
          ]}
          onPress={() => {
            if (item.startReminder === false && moment(new Date()).isBefore(item.date)) {
              this.props.startReminder(item);
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.startReminder ? colors.gunmetal : colors.red, padding: 2 }
            ]}
          >
            Start
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.tenMinReminder ? colors.gunmetal : colors.red,
              backgroundColor: item.tenMinReminder ? colors.green : null
            }
          ]}
          onPress={() => {
            if (item.tenMinReminder === false
              && moment(new Date()).isBefore(moment(item.date).subtract(10, 'minutes').toDate())
            ) {
              this.props.tenMinReminder(item);
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.tenMinReminder ? colors.gunmetal : colors.red, padding: 2 }
            ]}
          >
            10 Min
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.thirtyMinReminder ? colors.gunmetal : colors.red,
              backgroundColor: item.thirtyMinReminder ? colors.green : null
            }
          ]}
          onPress={() => {
            if (item.thirtyMinReminder === false
              && moment(new Date()).isBefore(moment(item.date).subtract(30, 'minutes').toDate())
            ) {
              this.props.thirtyMinReminder(item);
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.thirtyMinReminder ? colors.gunmetal : colors.red, padding: 2 }
            ]}
          >
            30 Min
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.oneHourReminder ? colors.gunmetal : colors.red,
              backgroundColor: item.oneHourReminder ? colors.green : null
            }
          ]}
          onPress={() => {
            if (item.oneHourReminder === false
              && moment(new Date()).isBefore(moment(item.date).subtract(1, 'hour').toDate())
            ) {
              this.props.oneHourReminder(item);
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.oneHourReminder ? colors.gunmetal : colors.red, padding: 2 }
            ]}
          >
            1 Hour
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.oneDayReminder ? colors.gunmetal : colors.red,
              backgroundColor: item.oneDayReminder ? colors.green : null
            }
          ]}
          onPress={() => {
            if (item.oneDayReminder === false
              && moment(new Date()).isBefore(moment(item.date).subtract(1, 'days').toDate())
            ) {
              this.props.oneDayReminder(item);
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.oneDayReminder ? colors.gunmetal : colors.red, padding: 2 }
            ]}
          >
            1 Day
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    width: HEIGHT > 667 ? WIDTH * 0.175 : null
  },
  text: {
    padding: 2,
    fontSize: 18
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  }
});

export default connect(null,
  { tenMinReminder,
    thirtyMinReminder,
    oneDayReminder,
    oneHourReminder,
    startReminder
  })(ReminderToggleButtons);
