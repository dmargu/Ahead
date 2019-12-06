import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  tenMinReminder,
  thirtyMinReminder,
  oneHourReminder,
  oneDayReminder,
  startReminder,
  cancelNotification,
  testing
} from '../actions';

class ReminderToggleButtons extends Component {
  constructor() {
    super();
    this.state = {
      startButtonDisabled: false,
      tenMinButtonDisabled: false,
      thirtyMinButtonDisabled: false,
      oneHourButtonDisabled: false,
      oneDayButtonDisabled: false
    };
  }
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
          disabled={this.state.startButtonDisabled}
          onPress={() => {
            this.setState({ startButtonDisabled: true }); //timeout to make sure there's time to cancel notif
            setTimeout(() => this.setState({ startButtonDisabled: false }), 1500); //before they set another
            if (item.startReminder === false && moment(new Date()).isBefore(item.date)) {
              this.props.startReminder(item);
            }
            if (item.startReminder) {
              this.props.cancelNotification(item, 'start');
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
          disabled={this.state.tenMinButtonDisabled}
          onPress={() => {
            this.setState({ tenMinButtonDisabled: true });
            setTimeout(() => this.setState({ tenMinButtonDisabled: false }), 1500);
            if (item.tenMinReminder === false
              && moment(new Date()).isBefore(moment(item.date).subtract(10, 'minutes').toDate())
            ) {
              this.props.tenMinReminder(item);
            }
            if (item.tenMinReminder) {
              this.props.cancelNotification(item, 'tenMin');
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
          disabled={this.state.thirtyMinButtonDisabled}
          onPress={() => {
            this.setState({ thirtyMinButtonDisabled: true });
            setTimeout(() => this.setState({ thirtyMinButtonDisabled: false }), 1500);
            if (item.thirtyMinReminder === false
              && moment(new Date()).isBefore(moment(item.date).subtract(30, 'minutes').toDate())
            ) {
              this.props.thirtyMinReminder(item);
            }
            if (item.thirtyMinReminder) {
              this.props.cancelNotification(item, 'thirtyMin');
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
          disabled={this.state.oneHourButtonDisabled}
          onPress={() => {
            this.setState({ oneHourButtonDisabled: true });
            setTimeout(() => this.setState({ oneHourButtonDisabled: false }), 1500);
            if (item.oneHourReminder === false
              && moment(new Date()).isBefore(moment(item.date).subtract(1, 'hour').toDate())
            ) {
              this.props.oneHourReminder(item);
            }
            if (item.oneHourReminder) {
              this.props.cancelNotification(item, 'oneHour');
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
          disabled={this.state.oneDayButtonDisabled}
          onPress={() => {
            this.setState({ oneDayButtonDisabled: true });
            setTimeout(() => this.setState({ oneDayButtonDisabled: false }), 1500);
            if (item.oneDayReminder === false
              && moment(new Date()).isBefore(moment(item.date).subtract(1, 'days').toDate())
            ) {
              this.props.oneDayReminder(item);
            }
            if (item.oneDayReminder) {
              this.props.cancelNotification(item, 'oneDay');
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
    width: HEIGHT > 667 ? WIDTH * 0.175 : null,
    height: 40
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
    startReminder,
    cancelNotification,
    testing
  })(ReminderToggleButtons);
