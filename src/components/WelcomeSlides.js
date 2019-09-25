import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;

class WelcomeSlides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title='Bring me to signup'
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete} // use parentheses on callback when you want function
                                          // to be called once the button is rendered, without the
                                         // parens the callback is only called when button
                                         // is pressed
        />
      );
    }
  }

  renderSlides = ({ item, index }) => {
    return (
      <View
        style={[styles.slideStyle, { backgroundColor: item.color }]}
      >
        <Text style={styles.textStyle} >{item.text}</Text>
        {this.renderLastSlide(index)}
      </View>
    );
  }

  render() {
    return (
      <FlatList
        horizontal
        style={{ flex: 1 }}
        data={this.props.data}
        keyExtractor={(item) => item.text}
        renderItem={this.renderSlides}
        pagingEnabled
      />
    );
  }
}

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    paddingLeft: 8
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#0288d1',
    marginTop: 15
  }
});

export default WelcomeSlides;
