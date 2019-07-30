import React, { Component } from 'react';
import { Agenda } from 'react-native-calendars';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

class Calendar extends Component {
  render() {
    const calItemsArray = Object.assign({}, //this needs to be optimized,
      ...this.props.todos.map(item =>
        ({ [moment(item.date).format('YYYY-MM-DD')]: [{
          text: item.text, time: moment(item.date).format('h:mm a') }] }))
      ); //need to make sure calendar can load everything fine (check the console log to see)
    console.log(calItemsArray);
    return (
      <Agenda
        items={calItemsArray}
        //loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderEmptyData={this.renderEmptyDate.bind(this)}
      />
    );
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is an empty day!</Text></View>
    );
  }


  renderItem(item) {
    return (
      <View
        style={[styles.item, { height: item.height }]}
      >
        <Text>{item.time} {item.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos
  };
}

export default connect(mapStateToProps)(Calendar);
