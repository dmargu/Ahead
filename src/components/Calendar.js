import React, { Component } from 'react';
import { Agenda } from 'react-native-calendars';
import { View, StyleSheet, Text } from 'react-native';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: { '2019-07-05': [{ text: 'EXAMPLE' }],
    '2019-07-02': [{ text: 'item 2 - any js object' }] }
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        //loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
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


  renderItem(item) {
    return (
      <View
        style={[styles.item, { height: item.height }]}
      >
        <Text>{item.text}</Text>
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

export default Calendar;
