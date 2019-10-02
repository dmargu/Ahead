import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import NotesModal from '../modals/NotesModal';
import DatePickerModal from '../modals/DatePickerModal';
import { toggleItemMenu } from '../../actions/ModalActions';
import ItemMenuBar from '../ItemMenuBar';
import ReminderToggleButtons from '../ReminderToggleButtons';

class TodoItem extends Component {
  render() {
    const todoItem = this.props.todoItem;
    return (
      <View>
        <TouchableHighlight
          onPress={() => this.props.toggleItemMenu(todoItem.id)}
          underlayColor={null}
        >
          <View style={styles.container}>
            <ListItem
              containerStyle={styles.todoItem}
              title={todoItem.text}
              titleStyle={{ color: '#FCEFEF', fontSize: 16 }}
              titleNumberOfLines={0} //for subtitle need to call function- why it's .bind(this)()
              subtitle={todoItem.date ? this.renderDate.bind(this)() : null}
              rightIcon={this.props.reminderToggleActive && todoItem.date ? null :
                <View style={{ paddingRight: 4 }}>
                  <TouchableHighlight
                    onPress={this.props.deleteTodo}
                    underlayColor={'#db5461'}
                  >
                    <Ionicons
                      name='md-checkbox'
                      color='#82ff9e'
                      size={35}
                    />
                  </TouchableHighlight>
                </View>
              }
            />
            {todoItem.itemMenuToggled ?
              <ItemMenuBar item={todoItem} /> : null
            }
            {this.props.reminderToggleActive && todoItem.date ?
              <ReminderToggleButtons item={todoItem} /> : null
            }
          </View>
        </TouchableHighlight>
        <NotesModal item={todoItem} />
        <DatePickerModal item={todoItem} />
      </View>
    );
  }
  renderDate() {
    const todoItem = this.props.todoItem;
    return moment(todoItem.date).format('YYYY MM DD') === moment(new Date()).format('YYYY MM DD') ?
      <Text style={{ color: '#cdd2c9', fontSize: 16 }}>
        {moment(todoItem.date).format('h:mm a')}
      </Text> :
      <Text style={{ color: '#cdd2c9', fontSize: 16 }}>
        {moment(todoItem.date).format('MMM DD')}
      </Text>;
  }
}


const styles = StyleSheet.create({
  todoItem: {
    width: '100%',
    paddingLeft: 15,
    backgroundColor: null,
    height: 60
  },
  container: {
    width: '100%',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1
  }
});

function mapStateToProps(state) {
  return {
    reminderToggleActive: state.RemindersReducer.reminderToggleActive,
  };
}

export default connect(mapStateToProps, { toggleItemMenu })(TodoItem);
