import React, { Component } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { toggleReminders } from '../../actions/ReminderActions';

class ReminderToggle extends Component {
  render() {
    return (
      <View>
      <MaterialCommunityIcons
        name={this.props.reminderToggleActive ? 'bell-ring' : 'bell'}
        size={32}
        color={this.props.reminderToggleActive ? '#33cccc' : '#f5f5f5'}
        onPress={() => this.props.toggleReminders(this.props.reminderToggleActive)}
      />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminderToggleActive: state.RemindersReducer.reminderToggleActive
  };
}

export default connect(mapStateToProps, { toggleReminders })(ReminderToggle);
