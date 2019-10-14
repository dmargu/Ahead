import React, { Component } from 'react';
import { View } from 'react-native';
import WelcomeSlides from '../components/WelcomeSlides';

const slideData = [
  { text: 'Welcome to Ahead, swipe to continue', color: '' },
  { text: 'Some quick things to note before you get started', color: '' },
  { text: 'To add reminders, make sure your item has a date, then press the bell in the top right',
    color: '' },
  { text: 'You can\'t cancel reminders yet (tragic I know)', color: '' },
  { text: 'Also if you set a reminder and change the date, it will go off at the original date',
    color: '' },
  { text: 'But if you change the date and then set another reminder that will work fine',
    color: '' },
  { text: 'Also good to know, the calendar only shows one item per day, will try to fix that soon',
    color: '' },
  { text: 'Thank you for using it and even though it\'s pretty empty now it will improve over time',
    color: '' },
  { text: 'But feel free to give me feedback on anything and ask me any questions you have',
    color: '' },
  { text: 'Also please make sure you are using dark mode for IOS 13 to see the datepicker better',
    color: '' }
];

class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WelcomeSlides data={slideData} onComplete={this.onSlidesComplete} />
      </View>
    );
  }
}

export default WelcomeScreen;
