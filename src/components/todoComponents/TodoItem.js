import React, { Component } from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import ItemInformationModal from '../modals/ItemInformationModal';
import { openItemModal } from '../../actions/ModalActions';

class TodoItem extends Component { //consider changing to react-native-elements list item
  render() {
    const todoItem = this.props.todoItem;
    return (
      <View>
        <TouchableOpacity
          style={styles.todoItem}
          onPress={() => this.props.openItemModal(todoItem.id)} //sending id for modal to open
        >
          <Text
            style={{
              color: '#f5f5f5',
              fontSize: 16 }}
          >
            {todoItem.text}
          </Text>
            <Button
              title='Remove'
              color='#ff5330'
              onPress={this.props.deleteTodo}
            />
        </TouchableOpacity>
        <ItemInformationModal />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  todoItem: {
    width: '100%',
    height: 50,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15
  }
});

/*function mapStateToProps({ ModalReducer }) {
  return { ModalReducer };
}*/

export default connect(null, { openItemModal })(TodoItem);
