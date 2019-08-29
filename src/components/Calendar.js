import React, { Component } from 'react';
import { Agenda } from 'react-native-calendars';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

class Calendar extends Component {
  render() {
    const calItemsArray = Object.assign({},
      ...this.props.todos.map(item =>
        ({ [moment(item.date).format('YYYY-MM-DD')]: [{
          text: item.text,
          time: moment(item.date).format('h:mm a')
        }]
        }))
      );

    const calItems = _.groupBy(this.props.todos, (date) => {
      return moment(date).format('YYYY-MM-DD');
    }
  );
    return (
      <Agenda //currently loads all upcoming days if there is something on that day
        items={calItemsArray} //but loads nothing if there is nothing on that day
        renderItem={this.renderItem.bind(this)} //check github issues for solution it's there
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderEmptyData={this.renderEmptyDate.bind(this)}
      />
    );
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
