import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import HomeworkItem from '../homeworkComponents/HomeworkItem';
import { removeHomework } from '../../actions';

class ClassAssignmentsList extends Component {
  render() {
    return (
      <View style={{ maxHeight: 250 }}>
        <View style={{ paddingTop: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.normalText}>Assignments</Text>
        </View>
        <FlatList
          data={_.sortBy(this.props.homework.filter(hw => hw.className === this.props.item.name), (hw) => {
            return hw.date;
          })}
          extraData={this.props.homework}
          keyExtractor={hw => hw.id}
          renderItem={({ item }) => {
            return (
              <HomeworkItem
                homeworkItem={item}
                deleteHomework={() => this.props.removeHomework(item)}
                forClassesList
                changeColor={'#555B6E'}
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  normalText: {
    fontSize: 16,
    color: '#db5461',
    fontWeight: 'bold'
  }
});

function mapStateToProps(state) {
  return {
    homework: state.ClassesReducer.homework
  };
}

export default connect(mapStateToProps, { removeHomework })(ClassAssignmentsList);
