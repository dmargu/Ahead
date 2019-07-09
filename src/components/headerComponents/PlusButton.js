import React, { Component } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEventModal from '../AddEventModal';

class PlusButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  render() {
    return (
      <View>
        <Ionicons
          name='md-add'
          size={32}
          onPress={() => { this.setState({ showModal: !this.state.showModal }); }}
        />
        <AddEventModal isVisible={this.state.showModal} />
      </View>
    );
  }
}

export default PlusButton;
