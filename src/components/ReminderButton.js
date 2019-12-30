import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import moment from 'moment';

const colors = {
  gunmetal: '#28313b',
  red: '#db5461',
  green: '#82ff9e'
};

const ReminderButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button,
        { borderColor: props.isReminderActive ? colors.gunmetal : colors.red,
          backgroundColor: props.isReminderActive ? colors.green : null
        }
      ]}
      disabled={props.buttonDisabledState}
      onPress={() => {
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
      }}
    >
      {props.isCustomReminder && <Text
        style={[styles.text, //THIS STYLING NEEDS FIXING
          { color: props.isReminderActive ? colors.gunmetal : colors.red, padding: 2 }
        ]}
      >
        {props.isReminderActive ? moment(props.customReminderTime).format('MMM DD h:mm a') : props.text}
      </Text>}

      {!props.isCustomReminder && <Text
        style={[styles.text,
          { color: props.isReminderActive ? colors.gunmetal : colors.red, padding: 2 }
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
    height: 40
  },
  text: {
    padding: 2,
    fontSize: 18
  }
});

export default ReminderButton;
