import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
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
      red: '#db5461'
    };
    return (
      <View
        style={{ flexDirection: 'row', justifyContent: 'center', }}
      >
        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.startReminder ? colors.gunmetal : colors.red,
              backgroundColor: item.startReminder ? colors.red : null
            }
          ]}
          onPress={() => this.props.startReminder(item)}
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
              backgroundColor: item.tenMinReminder ? colors.red : null
            }
          ]}
          onPress={() => this.props.tenMinReminder(item)}
        >
          <Text
            style={[styles.text,
              { color: item.tenMinReminder ? colors.gunmetal : colors.red, padding: 2 }
            ]}
          >
            10 min
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.thirtyMinReminder ? colors.gunmetal : colors.red,
              backgroundColor: item.thirtyMinReminder ? colors.red : null
            }
          ]}
          onPress={() => this.props.thirtyMinReminder(item)}
        >
          <Text
            style={[styles.text,
              { color: item.thirtyMinReminder ? colors.gunmetal : colors.red, padding: 2 }
            ]}
          >
            30 min
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.oneHourReminder ? colors.gunmetal : colors.red,
              backgroundColor: item.oneHourReminder ? colors.red : null
            }
          ]}
          onPress={() => this.props.oneHourReminder(item)}
        >
          <Text
            style={[styles.text,
              { color: item.oneHourReminder ? colors.gunmetal : colors.red, padding: 2 }
            ]}
          >
            1 hour
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,
            { borderColor: item.oneDayReminder ? colors.gunmetal : colors.red,
              backgroundColor: item.oneDayReminder ? colors.red : null
            }
          ]}
          onPress={() => this.props.oneDayReminder(item)}
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

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7
  },
  text: {
    padding: 2,
    fontSize: 16
  }
});

export default connect(null,
  { tenMinReminder,
    thirtyMinReminder,
    oneDayReminder,
    oneHourReminder,
    startReminder
  })(ReminderToggleButtons);
