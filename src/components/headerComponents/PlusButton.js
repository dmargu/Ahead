import React, { Component } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import AddEventModal from '../AddEventModal';

class PlusButton extends Component {
  render() {
    return (
      <View>
        <Ionicons
          name='md-add'
          size={32}
          onPress={() => this.props.openModal()}
        />
        <AddEventModal />
      </View>
    );
  }
}

function mapStateToProps({ ModalReducer }) {
  return { ModalReducer };
}

export default connect(mapStateToProps, actions)(PlusButton);
