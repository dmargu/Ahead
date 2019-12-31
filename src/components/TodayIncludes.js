import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ClassItem from './classComponents/ClassItem';

class TodayIncludes extends Component {
  render() {
    return (
      <View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Today</Text>
        </View>
        <FlatList
          data={this.props.classes}
          extraData={this.props.homework}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <ClassItem
                classItem={item}
                //deleteHomework={() => this.props.removeHomework(item)}
                todayListItem
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
    color: '#FCEFEF'
  },
  viewStyle: {
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
  }
});

function mapStateToProps(state) {
  return {
    classes: state.ClassesReducer.classes
  };
}
export default connect(mapStateToProps)(TodayIncludes);
