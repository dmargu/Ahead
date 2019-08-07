import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import ItemInformationModal from '../modals/ItemInformationModal';
import { openItemModal } from '../../actions/ModalActions';
import ReminderToggleButtons from '../ReminderToggleButtons';

class TodoItem extends Component {
  render() {
    const todoItem = this.props.todoItem;
    return (
      <View>
      <ListItem
        containerStyle={styles.todoItem}
        title={todoItem.text}
        titleStyle={{ color: '#f5f5f5', fontSize: 16 }}
        titleNumberOfLines={0} //for subtitle need to call function- why it is .bind(this)()
        subtitle={todoItem.date ? this.renderDate.bind(this)() : null}
        onPress={() => this.props.openItemModal(todoItem.id)}
        rightIcon={this.props.reminderToggleActive ? null :
          <Ionicons
            name='md-checkbox'
            color='#ff5330'
            onPress={this.props.deleteTodo}
            size={35}
          />
        }
        rightElement={this.props.reminderToggleActive ? <ReminderToggleButtons /> : null}
      />
        <ItemInformationModal />
      </View>
    );
  }
  renderDate() {
    const todoItem = this.props.todoItem;
    return moment(todoItem.date).format('YYYY MM DD') === moment(new Date()).format('YYYY MM DD') ?
      <Text>{moment(todoItem.date).format('h:mm a')}</Text> :
      <Text>{moment(todoItem.date).format('MMM DD')}</Text>;
  }
}


const styles = StyleSheet.create({
  todoItem: {
    width: '100%',
    height: 60,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    paddingLeft: 15,
    backgroundColor: null
  }
});

function mapStateToProps(state) {
  return {
    reminderToggleActive: state.RemindersReducer.reminderToggleActive
  };
}

export default connect(mapStateToProps, { openItemModal })(TodoItem);
