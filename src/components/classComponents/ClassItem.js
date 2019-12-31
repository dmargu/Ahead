import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import MainClassModal from './MainClassModal';
import HomeworkSwipeRow from '../homeworkComponents/HomeworkItemSwipe';
import { classesIcon } from '../../../assets/InAppIcons';

class ClassItem extends Component {
  constructor() {
    super();
    this.state = {
      classModalVisible: false
    };
  }
  render() {
    const classItem = this.props.classItem;
    console.log(this.state.classModalVisible);
    return (
        <View>
          <HomeworkSwipeRow
            item={classItem}
            completeItem={() => console.log('remove class')}
          >
            <TouchableHighlight
              underlayColor={null}
              onPress={() => this.setState({ classModalVisible: true })}
            >
              <ListItem
                containerStyle={styles.classItem}
                contentContainerStyle={styles.contentStyle}
                title={
                  <Text style={{ color: '#FCEFEF', fontSize: 16 }} ellipsizeMode='tail' numberOfLines={1}>
                    {classItem.name}
                  </Text>
                }
                leftAvatar={this.props.todayListItem ? classesIcon : null}
                subtitle={moment(classItem.classStartTime).format('h:mm a')}
              />
            </TouchableHighlight>
          </HomeworkSwipeRow>

          <MainClassModal
            item={classItem}
            isVisible={this.state.classModalVisible}
            closeHandle={() => this.setState({ classModalVisible: false })}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  classItem: {
    paddingLeft: 15,
    backgroundColor: '#28313b'
  },
  container: {
    width: '100%',
  },
  contentStyle: {
    flex: 1
  },
  dateSubtitle: {
    color: '#cdd2c9',
    fontSize: 16
  },
  overdueSubtitle: {
    color: '#db5461',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default connect(null)(ClassItem);
