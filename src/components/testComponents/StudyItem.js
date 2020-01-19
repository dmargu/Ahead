import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
//import NotesModal from '../modals/NotesModal';
//import DatePickerModal from '../modals/DatePickerModal';
import MainTestModal from './MainTestModal';
import HomeworkSwipeRow from '../homeworkComponents/HomeworkItemSwipe';
import { testIcon } from '../../../assets/InAppIcons';
import { colors, fonts } from '../../styles';

class StudyItem extends Component {
  constructor() {
    super();
    this.state = {
      testModalVisible: false
    };
  }
  render() {
    const item = this.props.item;
    return (
        <View>
          <HomeworkSwipeRow
            item={item}
            completeItem={this.props.deleteStudy}
          >
            <TouchableHighlight
              underlayColor={null}
              onPress={() => this.setState({ testModalVisible: true })}
            >
              <ListItem
                containerStyle={[styles.item,
                  { backgroundColor: this.props.changeColor ? this.props.changeColor : colors.mainDark }
                ]}
                contentContainerStyle={styles.contentStyle}
                title={
                  <Text
                    style={styles.textStyle}
                    ellipsizeMode='tail'
                    numberOfLines={1}
                  >
                    {item.studyName}
                  </Text>
                }
                leftAvatar={testIcon}
                rightTitle={item.test.className ? item.test.className : null}
                rightTitleStyle={styles.dateSubtitle}
              />
            </TouchableHighlight>
          </HomeworkSwipeRow>

          <MainTestModal
            item={item.test}
            isVisible={this.state.testModalVisible}
            closeHandle={() => this.setState({ testModalVisible: false })}
          />
          {/*<View style={{ paddingTop: 4 }}>
            {item.remindersToggled && item.date ?
              <ReminderToggleButtons item={item} /> : null
            }
          </View>

          {item.notesModalVisible ?
            <NotesModal item={item} /> : null
          }

          {item.dateModalVisible ?
            <DatePickerModal item={item} /> : null
          }*/}

        </View>
    );
  }
}


const styles = StyleSheet.create({
  item: {
    paddingLeft: 15,
  },
  container: {
    width: '100%',
  },
  contentStyle: {
    flex: 1
  },
  dateSubtitle: {
    fontSize: fonts.subtitleText,
    color: colors.white,
    fontFamily: fonts.fontFamily
  },
  overdueSubtitle: {
    color: colors.mainRed,
    fontSize: fonts.subtitleText,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily
  },
  textStyle: {
    fontSize: fonts.normalText,
    color: colors.white,
    fontFamily: fonts.fontFamily
  }
});

export default StudyItem;
