import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  cancelNotification,
} from '../actions';


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
      disabled={props.buttonDisabledState} //timout ensures there's enough time to cancel notif
      onPress={() => {
        this.setState({ [props.buttonDisabledState]: true });
        setTimeout(() => this.setState({ [props.buttonDisabledState]: false }), 1500);
        if (props.isReminderActive === false && moment(new Date()).isBefore(props.item.date)) {
          props.addReminderFunction(props.item);
        }
        if (props.isReminderActive) {
          this.props.cancelNotification(props.item.id, 'start');
        }
      }}
    >
      {props.isCustomReminder && <Text
        style={[styles.text,
          { color: props.isReminderActive ? colors.gunmetal : colors.red, padding: 2 }
        ]}
      >
        {props.isReminderActive ? moment(props.item.date).format('MMM DD h:mm a') : props.text}
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
  {
    cancelNotification,
  })(ReminderButton);
