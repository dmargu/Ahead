import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  homeIcon,
  calendarIcon,
  habitIcon,
  settingsIcon,
  todoIcon,
  aheadArrow
} from '../../assets/InAppIcons';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').width;

class MenuDrawer extends Component {
  navLink(nav, text, icon) {
    return (
      <TouchableOpacity
        style={styles.iconConfig}
        onPress={() => this.props.navigation.navigate(nav)}
      >
        {icon}
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topLinks}>
            {aheadArrow}
            <Text style={styles.sloganStyle}>get ahead.</Text>
        </View>
        <View style={styles.bottomLinks}>
          {this.navLink('Home', 'Home', homeIcon)}
          {this.navLink('Calendar', 'Calendar', calendarIcon)}
          {this.navLink('Todo', 'Todo\'s', todoIcon)}
          {this.navLink('Habits', 'Habits', habitIcon)}
          {this.navLink('Settings', 'Settings', settingsIcon)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey'
  },
  link: {
    flex: 1,
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: 'left',
    color: '#f5f5f5'
  },
  topLinks: {
    height: 140,
    backgroundColor: '#ab987a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: '#0f1626',
    paddingTop: 15,
    paddingBottom: 450
  },
  iconConfig: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    height: 50
  },
  sloganStyle: {
    paddingLeft: 10,
    fontSize: 25,
    color: '#ff5330'
  }
});

export default MenuDrawer;
