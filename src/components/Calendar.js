import React, { Component } from 'react';
import { Agenda } from 'react-native-calendars';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { colors, fonts } from '../styles';

class CalendarScreen extends Component {
  render() {
    const homework = this.props.homework.filter(hw => hw.date);
    /*eslint-disable no-param-reassign*/
    homework.forEach(hw => (hw.text = hw.assignmentName));
    const tests = this.props.tests.filter(test => test.date);
    tests.forEach(test => (test.text = test.testName));
    /*eslint-enable no-param-reassign*/
    const classDates = [];
    for (let x = 0; x < this.props.classes.length; x++) {
      const c = this.props.classes[x];
      c.classDays.map(day => (classDates.push({ text: c.name, date: day })));
    }
    const iCalEvents = this.props.iCalEvents;

    let allItems = homework.concat(this.props.todos, tests, classDates, iCalEvents);
    allItems = _.sortBy(allItems, (item) => { return item.date; }); //not working right

    const calItemsArray = allItems.reduce((acc, item) => {
      const accumulator = acc;
      const key = moment(item.date).format('YYYY-MM-DD');
      const payload = { text: item.text, time: moment(item.date).format('h:mm a') };

      //eslint-disable-next-line no-unused-expressions
      (accumulator[key] ? acc[key].push(payload) : (accumulator[key] = [payload]));
      return accumulator;
    }, {});

    const calendarTheme = {
      backgroundColor: colors.mainDark,
      calendarBackground: colors.mainDark,
      agendaDayNumColor: colors.mainLightText,
      agendaTodayColor: colors.mainRed,
      agendaKnobColor: colors.mainRed,
      agendaDayTextColor: colors.blue,
      todayTextColor: colors.mainRed,
      dayTextColor: colors.mainLightText,
      dotColor: colors.blue,
      selectedDotColor: colors.white,
      selectedDayBackgroundColor: colors.blue,
      monthTextColor: colors.white,
      textDayFontFamily: fonts.fontFamily,
      textMonthFontFamily: fonts.fontFamily,
      textDayHeaderFontFamily: fonts.fontFamily,
      textSectionTitleColor: colors.mainLightText

    };

    return (
      <Agenda //currently loads all upcoming days if there is something on that day
        items={calItemsArray} //but loads nothing if there is nothing on that day
        renderItem={this.renderItem.bind(this)} //check github issues for solution it's there
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderKnob={this.renderKnob.bind(this)}
        renderEmptyData={this.renderEmptyDate.bind(this)}
        theme={calendarTheme}
      />
    );
  }

  renderKnob() {
    return (
      <View style={{ paddingTop: 2 }}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={[styles.text, { padding: 2 }]}>Tap to expand</Text>
        </TouchableOpacity>
      </View>
    );
  }


  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.text}>Nothing today. Expand the calendar to view other days.</Text>
      </View>
    );
  }


  renderItem(item) {
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.text}>{item.time}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.lightGrey,
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
  },
  text: {
    color: colors.white,
    fontSize: fonts.normalText,
    fontFamily: fonts.fontFamily
  },
  buttonContainer: {
    backgroundColor: colors.mainRed,
    borderRadius: 8,
  }
});

function mapStateToProps(state) {
  return {
    classes: state.ClassesReducer.classes,
    homework: state.ClassesReducer.homework,
    todos: state.TodoReducer.todos,
    tests: state.ClassesReducer.tests,
    iCalEvents: state.StorageReducer.iCalEvents
  };
}

export default connect(mapStateToProps)(CalendarScreen);
