import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { connect } from 'react-redux';
import Header from '../../components/common/Header';
import { classesIcon, homeworkIcon, testIcon } from '../../../assets/InAppIcons';
import CreateClassModal from '../../components/modals/createModals/CreateClassModal';
import CreateTestModal from '../../components/modals/createModals/CreateTestModal';
import CreateHomeworkModal from '../../components/modals/createModals/CreateHomeworkModal';
import HomeworkItem from '../../components/homeworkComponents/HomeworkItem';
import { toggleCreateClassModal, toggleCreateTestModal, toggleCreateHomeworkModal } from '../../actions';

class ClassesScreen extends Component {
  filterAssignments(c, hw) {
    return hw.filter(item => item.className === c.name);
  }
  render() {
    const actions = [
      {
        text: 'Class',
        name: 'class',
        icon: classesIcon,
        position: 3
      },
      {
        text: 'Homework',
        name: 'homework',
        icon: homeworkIcon,
        position: 2
      },
      {
        text: 'Test',
        name: 'test',
        icon: testIcon,
        position: 1
      }
    ];
    const classData = [];
    for (let x = 0; x < this.props.classes.length; x++) {
      classData.push({
        classProps: this.props.classes[x],
        assignments: this.filterAssignments(this.props.classes[x], this.props.homework).bind(this)
      });
    }
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} screenName='Classes' />

        <SectionList
          sections={classData}
          keyExtractor={item => item.class.id}
          renderSectionHeader={({ section: classProps }) => {
            return (
              <Text style={styles.textStyle}>{classProps.name}</Text>
            );
          }}
          renderItem={({ item }) => {
            return (
              <HomeworkItem
                homeworkItem={item}
                deleteHomework={() => this.props.removeHomework(item)}
              />
            );
          }}
        />

        <FloatingAction
          actions={actions}
          onPressItem={name => {
            switch (name) {
              case 'class':
                this.props.toggleCreateClassModal();
                return;
              case 'test':
                this.props.toggleCreateTestModal();
                return;
              case 'homework':
                this.props.toggleCreateHomeworkModal();
                return;
              default:
                return;
            }
          }}
        />
        <CreateClassModal />
        <CreateTestModal />
        <CreateHomeworkModal />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: 'white'
  }
});

function mapStateToProps(state) {
  return {
    classes: state.ClassesReducer.classes,
    homework: state.ClassesReducer.homework
  };
}

export default connect(mapStateToProps, {
  toggleCreateClassModal,
  toggleCreateTestModal,
  toggleCreateHomeworkModal
})(ClassesScreen);
