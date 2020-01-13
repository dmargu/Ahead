import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import moment from 'moment';
import { registerForPushNotificationsAsync } from '../functions/pushNotificationsRegister';
import { colors, fonts } from '../styles';

const ReminderButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button,
        { borderColor: props.isReminderActive ? null : colors.mainRed,
          borderWidth: props.isReminderActive ? null : 1,
          backgroundColor: props.isReminderActive ? colors.green : null
        }
      ]}
      disabled={props.buttonDisabledState}
      onPress={async () => {
        const permission = await registerForPushNotificationsAsync();
        if (permission) {
          if (!props.isCustomReminder && !props.isReminderActive && moment(new Date()).isBefore(props.date)) {
            props.addReminderFunction();
          }
          if (props.isCustomReminder && !props.isReminderActive && moment(new Date()).isBefore(props.date)) {
            props.makeDatePickerVisible();
          }
          if (props.isReminderActive) {
            props.cancelNotification();
          }
          props.changeButtonDisabledState(true); //timeout ensures there's enough time to cancel notif
          setTimeout(() => props.changeButtonDisabledState(false), 1500);
        } else {
          Alert.alert(
            'Cannot send notifications without permission.',
            null,
            [
              { text: 'OK' }
            ],
              { cancelable: false }
          );
        }
      }}
    >
      {props.isCustomReminder && <Text
        style={[styles.text, //THIS STYLING NEEDS FIXING
          { color: props.isReminderActive ? colors.mainDark : colors.mainRed, padding: 2 }
        ]}
      >
        {props.isReminderActive ? moment(props.customReminderTime).format('MMM DD h:mm a') : props.text}
      </Text>}

      {!props.isCustomReminder && <Text
        style={[styles.text,
          { color: props.isReminderActive ? colors.mainDark : colors.mainRed, padding: 2 }
        ]}
      >
        {props.text}
      </Text>}
    </TouchableOpacity>
  );
};

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    width: HEIGHT > 667 ? WIDTH * 0.175 : null,
    height: 40,
    padding: 2
  },
  text: {
    padding: 2,
    fontSize: fonts.buttonText,
    fontFamily: fonts.fontFamily
  }
});

export default ReminderButton;
