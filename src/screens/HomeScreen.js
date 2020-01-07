import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  InputAccessoryView,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import { FloatingAction } from 'react-native-floating-action';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import Header from '../components/common/Header';
import TodayIncludes from '../components/TodayIncludes';
import { registerForPushNotificationsAsync } from '../functions/pushNotificationsRegister';
import { todoIcon, homeworkIcon, testIcon } from '../../assets/InAppIcons';
import AddTodo from '../components/todoComponents/AddTodo';
//import FloatingPlusButton from '../components/FloatingPlusButton';
import CreateHomeworkModal from '../components/modals/createModals/CreateHomeworkModal';
import CreateTestModal from '../components/modals/createModals/CreateTestModal';
import AssignmentsAndTodosList from '../components/AssignmentsAndTodos';
import { addTodo, toggleCreateHomeworkModal, toggleCreateTestModal } from '../actions';
import { colors } from '../styles';


const HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      textInput: '',
      inputVisible: true,
      classNameFromNotification: ''
    };
  }
  componentDidMount() {
    registerForPushNotificationsAsync();
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    this.setState({ inputVisible: false });
    this.notificationSubscription = Notifications.addListener(n => this.handleNotification(n));
  }

  handleNotification(n) {
    if (n.origin === 'selected' && n.data.type === 'afterClassReminder') {
      this.setState({ classNameFromNotification: n.data.className });
      this.props.toggleCreateHomeworkModal();
    }
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    this.notificationSubscription.remove();
  }

  keyboardDidHide() {
    this.setState({ inputVisible: false });
  }

  addTodo() {
    if (this.state.textInput !== '') {
      this.props.addTodo(this.state.textInput);
    }
    this.setState({ textInput: '' });
    return;
  }

  render() { //in future change inputAccessory to <KeyboardAccessoryView hideBorder> for android function
    const actions = [ //doesn't work right now though for some reason the button won't press
      {
        text: 'To-do',
        name: 'todo',
        icon: todoIcon,
        position: 3,
        color: '#EC4E20'
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
      <KeyboardAvoidingView style={styles.container}>
        <Header navigation={this.props.navigation} screenName='Home' />
        <TodayIncludes />
        <AssignmentsAndTodosList />
        { !this.state.inputVisible &&
          <FloatingAction
            actions={actions}
            color={colors.mainRed}
            shadow={{ shadowColor: '#BF264C', shadowRadius: 5 }}
            onPressItem={name => {
              switch (name) {
                case 'todo':
                  this.setState({ inputVisible: true }, () => { this.textInputField.focus(); });
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
        }
        <InputAccessoryView>
          { this.state.inputVisible &&
            <AddTodo
              textChange={textInput => this.setState({ textInput })}
              addNewTodo={this.addTodo.bind(this)}
              textInput={this.state.textInput}
              ref={(ref) => { this.textInputField = ref; }}
              onSubmitEditing={this.addTodo.bind(this)}
            />
          }
        </InputAccessoryView>
        <CreateTestModal />
        <CreateHomeworkModal
          classNameFromNotification={this.state.classNameFromNotification}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: HEIGHT
  },
  headerTextStyle: {
      fontSize: 20,
      color: '#FCEFEF',
      fontWeight: 'bold',
  },
  headerViewStyle: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      //height: 40,
      flexDirection: 'row',
  }
});

export default connect(null, {
  addTodo,
  toggleCreateHomeworkModal,
  toggleCreateTestModal
})(HomeScreen);
