import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Header from '../../components/common/Header';
import AppleStyleSwipeableRow from '../../components/gmailRowSwipe';
import ItemSwipeRow from '../../components/ItemSwipe';

class HabitsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} screenName='Habits' />
        <AppleStyleSwipeableRow>
          <ListItem />
        </AppleStyleSwipeableRow>

        <ItemSwipeRow>
          <ListItem />
        </ItemSwipeRow>
      </View>
    );
  }
}

export default HabitsScreen;
