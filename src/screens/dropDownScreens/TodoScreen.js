import React, { Component } from 'react';
import { View, Dimensions, Keyboard, InputAccessoryView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/common/Header';
import MainTodo from '../../components/todoComponents/mainTodo';
import { registerForPushNotificationsAsync } from '../../functions/pushNotificationsRegister';
import AddTodo from '../../components/todoComponents/AddTodo';
import FloatingPlusButton from '../../components/FloatingPlusButton';
import { addTodo } from '../../actions';

const HEIGHT = Dimensions.get('window').height;

class TodoScreen extends Component {
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
    return ( //doesn't work right now though for some reason the button won't press
      <View style={styles.container}>
        <Header navigation={this.props.navigation} screenName={'To-do\'s'} />
        {/*<TodayIncludes />*/}
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
    height: HEIGHT,
  }
});

export default connect(null, { addTodo })(TodoScreen);
