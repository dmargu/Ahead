import React, { Component } from 'react';
import { View, Dimensions, Keyboard, InputAccessoryView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
//import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import Header from '../components/common/Header';
//import TodayIncludes from '../components/TodayIncludes';
import MainTodo from '../components/todoComponents/mainTodo';
import { registerForPushNotificationsAsync } from '../functions/pushNotificationsRegister';
import AddTodo from '../components/todoComponents/AddTodo';
import FloatingPlusButton from '../components/FloatingPlusButton';
import { addTodo } from '../actions';


const HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      textInput: '',
      inputVisible: true
    };
  }
  componentDidMount() {
    registerForPushNotificationsAsync();
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    this.setState({ inputVisible: false });
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
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

  onFloatingButtonPress() {
    this.setState({ inputVisible: true }, () => { this.textInputField.focus(); });
  }
  render() { //in future change inputAccessory to <KeyboardAccessoryView hideBorder> for android function
    const headerString = 'To-Do\'s'; //doesn't work right now though for some reason the button won't press
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} screenName='Home' />
        {/*<TodayIncludes />*/}
        <View style={styles.headerViewStyle}>
          <Text style={styles.headerTextStyle}>{headerString}</Text>
        </View>
        <MainTodo />
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
        { !this.state.inputVisible &&
          <FloatingPlusButton tapToAddEvent={this.onFloatingButtonPress.bind(this)} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT
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
      height: 40,
      flexDirection: 'row',
  }
});

export default connect(null, { addTodo })(HomeScreen);
