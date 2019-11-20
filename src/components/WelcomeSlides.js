import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';

const screenWidth = Dimensions.get('window').width;

class WelcomeSlides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.props.onComplete}
        >
          <Text style={styles.signUpText}>Take me to signup</Text>
        </TouchableHighlight>
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
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#db5461',
  },
  signUpText: {
    color: '#fcefef',
  }
});

export default WelcomeSlides;
