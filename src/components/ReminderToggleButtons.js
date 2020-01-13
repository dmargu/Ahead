import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { registerForPushNotificationsAsync } from '../functions/pushNotificationsRegister';
import {
  tenMinReminder,
  thirtyMinReminder,
  oneHourReminder,
  oneDayReminder,
  startReminder,
  cancelNotification,
} from '../actions';
import { colors, fonts } from '../styles';

const CannotSendNotificationsAlert = () => {
  return (
    Alert.alert(
      'Cannot send notifications without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    )
  );
};

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

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.startReminder ? null : colors.mainRed,
              borderWidth: item.startReminder ? null : 1,
              backgroundColor: item.startReminder ? colors.green : null
            }
          ]}
          disabled={this.state.startButtonDisabled}
          onPress={async () => {
            const permission = await registerForPushNotificationsAsync();
            if (permission) { //timeout to make sure there's time to cancel notif
              this.setState({ startButtonDisabled: true }); //before they set another
              setTimeout(() => this.setState({ startButtonDisabled: false }), 1500);
              if (item.startReminder === false && moment(new Date()).isBefore(item.date)) {
                this.props.startReminder(item);
              }
              if (item.startReminder) {
                this.props.cancelNotification(item.id, 'start', this.props.notificationIDs);
              }
            } else {
              CannotSendNotificationsAlert();
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.startReminder ? colors.mainDark : colors.mainRed, padding: 2 }
            ]}
          >
            Start
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.tenMinReminder ? null : colors.mainRed,
              borderWidth: item.tenMinReminder ? null : 1,
              backgroundColor: item.tenMinReminder ? colors.green : null
            }
          ]}
          disabled={this.state.tenMinButtonDisabled}
          onPress={async () => {
            const permission = await registerForPushNotificationsAsync();
            if (permission) {
              this.setState({ tenMinButtonDisabled: true });
              setTimeout(() => this.setState({ tenMinButtonDisabled: false }), 1500);
              if (item.tenMinReminder === false
                && moment(new Date()).isBefore(moment(item.date).subtract(10, 'minutes').toDate())
              ) {
                this.props.tenMinReminder(item);
              }
              if (item.tenMinReminder) {
                this.props.cancelNotification(item.id, 'tenMin', this.props.notificationIDs);
              }
            } else {
              CannotSendNotificationsAlert();
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.tenMinReminder ? colors.mainDark : colors.mainRed, padding: 2 }
            ]}
          >
            10 Min
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.thirtyMinReminder ? colors.mainDark : colors.mainRed,
              borderWidth: item.thirtyMinReminder ? null : 1,
              backgroundColor: item.thirtyMinReminder ? colors.green : null
            }
          ]}
          disabled={this.state.thirtyMinButtonDisabled}
          onPress={async () => {
            const permission = await registerForPushNotificationsAsync();
            if (permission) {
              this.setState({ thirtyMinButtonDisabled: true });
              setTimeout(() => this.setState({ thirtyMinButtonDisabled: false }), 1500);
              if (item.thirtyMinReminder === false
                && moment(new Date()).isBefore(moment(item.date).subtract(30, 'minutes').toDate())
              ) {
                this.props.thirtyMinReminder(item);
              }
              if (item.thirtyMinReminder) {
                this.props.cancelNotification(item.id, 'thirtyMin', this.props.notificationIDs);
              }
            } else {
              CannotSendNotificationsAlert();
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.thirtyMinReminder ? colors.mainDark : colors.mainRed, padding: 2 }
            ]}
          >
            30 Min
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.oneHourReminder ? colors.mainDark : colors.mainRed,
              borderWidth: item.oneHourReminder ? null : 1,
              backgroundColor: item.oneHourReminder ? colors.green : null
            }
          ]}
          disabled={this.state.oneHourButtonDisabled}
          onPress={async () => {
            const permission = await registerForPushNotificationsAsync();
            if (permission) {
              this.setState({ oneHourButtonDisabled: true });
              setTimeout(() => this.setState({ oneHourButtonDisabled: false }), 1500);
              if (item.oneHourReminder === false
                && moment(new Date()).isBefore(moment(item.date).subtract(1, 'hour').toDate())
              ) {
                this.props.oneHourReminder(item);
              }
              if (item.oneHourReminder) {
                this.props.cancelNotification(item.id, 'oneHour', this.props.notificationIDs);
              }
            } else {
              CannotSendNotificationsAlert();
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.oneHourReminder ? colors.mainDark : colors.mainRed, padding: 2 }
            ]}
          >
            1 Hour
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.oneDayReminder ? colors.mainDark : colors.mainRed,
              borderWidth: item.oneDayReminder ? null : 1,
              backgroundColor: item.oneDayReminder ? colors.green : null
            }
          ]}
          disabled={this.state.oneDayButtonDisabled}
          onPress={async () => {
            const permission = await registerForPushNotificationsAsync();
            if (permission) {
              this.setState({ oneDayButtonDisabled: true });
              setTimeout(() => this.setState({ oneDayButtonDisabled: false }), 1500);
              if (item.oneDayReminder === false
                && moment(new Date()).isBefore(moment(item.date).subtract(1, 'days').toDate())
              ) {
                this.props.oneDayReminder(item);
              }
              if (item.oneDayReminder) {
                this.props.cancelNotification(item.id, 'oneDay', this.props.notificationIDs);
              }
            } else {
              CannotSendNotificationsAlert();
            }
          }}
        >
          <Text
            style={[styles.text,
              { color: item.oneDayReminder ? colors.mainDark : colors.mainRed, padding: 2 }
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
    fontSize: fonts.buttonText,
    fontFamily: fonts.fontFamily
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

function mapStateToProps(state) {
  return {
    notificationIDs: state.StorageReducer.notificationIDs
  };
}

export default connect(mapStateToProps,
  { tenMinReminder,
    thirtyMinReminder,
    oneDayReminder,
    oneHourReminder,
    startReminder,
    cancelNotification,
  })(ReminderToggleButtons);
