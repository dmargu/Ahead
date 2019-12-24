import React, { Component } from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import HomeworkItem from './HomeworkItem';
import { removeHomework } from '../../actions';

const HEIGHT = Dimensions.get('window').height;

class HomeworkList extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <FlatList
          data={_.sortBy(this.props.homework, (item) => { //not working correctly
            return item.date;
          })}
          extraData={this.props.homework}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <HomeworkItem
                homeworkItem={item}
                deleteHomework={() => this.props.removeHomework(item)}
              />
            );
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    height: HEIGHT,
    position: 'relative',
    zIndex: 10
  },
});

function mapStateToProps(state) {
  return {
    homework: state.ClassesReducer.homework,
  };
}

export default connect(mapStateToProps, { removeHomework })(HomeworkList);
