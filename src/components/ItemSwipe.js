import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { openNotesModal, openDateModal } from '../actions';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

class ItemSwipeRow extends Component { //something is just wrong here
  constructor(props) { //item's dates are not changing right at all
    super(props);
    this.item = props.item;
  }

  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction}>
        <AnimatedIcon
          name='md-checkmark'
          color='#28313b'
          size={45}
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        />
      </RectButton>
    );
  };

  renderRightAction = (action, name, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      action(this.item);
      console.log(action(this.item));
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <MaterialCommunityIcons
            name={name}
            size={35}
            color='#28313b'
          />
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = progress => (
    <View style={{ width: 192, flexDirection: 'row' }}>
      {this.renderRightAction(
        this.props.openDateModal, 'calendar', '#B8B8F3', 192, progress
      )}
      {this.renderRightAction(
        this.props.openNotesModal, 'pencil', '#F0A202', 128, progress
      )}
      {this.renderRightAction(
        this.props.openDateModal, 'bell', '#db5461', 64, progress
      )}
    </View>
  );

  updateRef = ref => {
    this.currItem = ref;
  };
  close = () => {
    if (this.currItem !== null) { this.currItem.close(); }
  };

  onSwipeableLeftOpen = () => {
    this.props.completeItem();
    this.close();
  }

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={70}
        rightThreshold={40}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
        onSwipeableLeftOpen={this.onSwipeableLeftOpen}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#82ff9e',
    justifyContent: 'center',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default connect(null, { openNotesModal, openDateModal })(ItemSwipeRow);
