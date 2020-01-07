import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  homeIcon,
  calendarIcon,
  //habitIcon,
  classesIcon,
  settingsIcon,
  todoIcon,
  aheadArrow
} from '../../assets/InAppIcons';
import { colors } from '../styles';


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
        <ScrollView style={styles.scroller}>
          <View style={styles.topLinks}>
              {aheadArrow}
              <Text style={styles.sloganStyle}>get ahead.</Text>
          </View>
          <View style={styles.bottomLinks}>
            {this.navLink('Home', 'Home', homeIcon)}
            {this.navLink('Calendar', 'Calendar', calendarIcon)}
            {this.navLink('Todo', 'To-Do\'s', todoIcon)}
            {this.navLink('Classes', 'Classes', classesIcon)}
            {this.navLink('Settings', 'Settings', settingsIcon)}
          </View>
        </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.description}>Ahead</Text>
            <Text style={styles.version}>v1.0.7</Text>
          </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroller: {
    flex: 1
  },
  link: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 14,
    margin: 5,
    textAlign: 'left',
    color: colors.mainLightText
  },
  topLinks: {
    height: 140,
    backgroundColor: colors.darkRed,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: colors.mainDark,
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
    color: colors.mainLightText
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.25,
    borderTopColor: colors.mainLightText,
    backgroundColor: colors.mainDark
  },
  description: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
    color: colors.mainLightText
  },
  version: {
    flex: 1,
    textAlign: 'right',
    marginRight: 20,
    color: colors.mainLightText
  }
});

export default MenuDrawer;
