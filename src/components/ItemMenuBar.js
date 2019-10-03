import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { openNotesModal, openDateModal } from '../actions';

class ItemMenuBar extends Component {
  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Ionicons
            name='md-calendar'
            size={32}
            color='#db5461'
            onPress={() => this.props.openDateModal(item)}
          />
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name='pencil'
            size={32}
            color='#db5461'
            onPress={() => this.props.openNotesModal(item)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    paddingLeft: 30,
    paddingRight: 30
  }
});

export default connect(null, { openNotesModal, openDateModal })(ItemMenuBar);
