import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
//import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import MainClassModal from './MainClassModal';
import HomeworkSwipeRow from '../homeworkComponents/HomeworkItemSwipe';
import { classesIcon } from '../../../assets/InAppIcons';
import { colors, fonts } from '../../styles';

class ClassItem extends Component {
  constructor() {
    super();
    this.state = {
      classModalVisible: false
    };
  }
  render() {
    const classItem = this.props.classItem;
    return (
        <View>
          <HomeworkSwipeRow
            item={classItem}
            completeItem={() => this.props.removeClassDay()}
          >
            <TouchableHighlight
              underlayColor={null}
              onPress={() => this.setState({ classModalVisible: true })}
            >
              <ListItem
                containerStyle={styles.classItem}
                contentContainerStyle={styles.contentStyle}
                title={
                  <Text
                    style={styles.normalText}
                    ellipsizeMode='tail'
                    numberOfLines={1}
                  >
                    {classItem.name}
                  </Text>
                }
                leftAvatar={this.props.todayListItem ? classesIcon : null}
                subtitle={moment(classItem.classStartTime).format('h:mm a')}
                subtitleStyle={styles.dateSubtitle}
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
    backgroundColor: colors.mainDark,
  },
  container: {
    width: '100%',
  },
  contentStyle: {
    flex: 1
  },
  dateSubtitle: {
    color: colors.lightGrey,
    fontSize: fonts.subtitleText,
    fontFamily: fonts.fontFamily
  },
  normalText: {
    color: colors.white,
    fontSize: fonts.normalText,
    fontFamily: fonts.fontFamily
  }
});

export default ClassItem;
