import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { connect } from 'react-redux';
import Header from '../../components/common/Header';
import { classesIcon, homeworkIcon, testIcon } from '../../../assets/InAppIcons';
import CreateClassModal from '../../components/modals/createModals/CreateClassModal';
import CreateTestModal from '../../components/modals/createModals/CreateTestModal';
import CreateHomeworkModal from '../../components/modals/createModals/CreateHomeworkModal';
import { toggleCreateClassModal, toggleCreateTestModal, toggleCreateHomeworkModal } from '../../actions';

class ClassesScreen extends Component {
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
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} screenName='Classes' />
        <FlatList
          data={this.props.classes}
          extraData={this.props.classes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={styles.textStyle}>{item.name}</Text>
              </View>
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
    classes: state.ClassesReducer.classes
  };
}

export default connect(mapStateToProps, {
  toggleCreateClassModal,
  toggleCreateTestModal,
  toggleCreateHomeworkModal
})(ClassesScreen);
