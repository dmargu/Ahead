import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import ItemInformationModal from '../modals/ItemInformationModal';
import { openItemModal } from '../../actions/ModalActions';
import ReminderToggleButtons from '../ReminderToggleButtons';

class TodoItem extends Component { //should make the ListItem bigger if reminder toggle is active
  render() { //this way can see more of the title and buttons actually fit
    const todoItem = this.props.todoItem;
    return (
      <View>
        <TouchableHighlight
          onPress={() => this.props.openItemModal(todoItem.id)}
          underlayColor={'#dbdbdb'}
        >
          <View style={styles.container}>
            <ListItem
              containerStyle={[styles.todoItem,
                { height: this.props.reminderToggleActive && todoItem.date ?
                  60 : 60
                }
              ]}
              title={todoItem.text}
              titleStyle={{ color: '#FCEFEF', fontSize: 16 }}
              titleNumberOfLines={0} //for subtitle need to call function- why it's .bind(this)()
              subtitle={todoItem.date ? this.renderDate.bind(this)() : null}
              rightIcon={this.props.reminderToggleActive && todoItem.date ? null :
                <View style={{ paddingRight: 4 }}>
                  <TouchableHighlight
                    onPress={this.props.deleteTodo}
                    underlayColor={'#86fcc9'}
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
            {this.props.reminderToggleActive && todoItem.date ?
              <ReminderToggleButtons item={todoItem} /> : null
            }
          </View>
        </TouchableHighlight>
        <ItemInformationModal />
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
    backgroundColor: null
  },
  container: {
    width: '100%',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1
  }
});

function mapStateToProps(state) {
  return {
    reminderToggleActive: state.RemindersReducer.reminderToggleActive
  };
}

export default connect(mapStateToProps, { openItemModal })(TodoItem);
