import React, { Component } from 'react';
import { View } from 'react-native';
import WelcomeSlides from '../components/WelcomeSlides';

const slideData = [
  { text: 'Welcome to Ahead, swipe to continue', color: '' },
  { text: 'Some quick things to note before you get started', color: '' },
  { text: 'Also good to know, the calendar only shows one item per day, will try to fix that soon',
    color: '' },
  { text: 'Thank you for using it and even though it\'s pretty empty now it will improve over time',
    color: '' },
  { text: 'But feel free to give me feedback on anything and ask me any questions you have',
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
