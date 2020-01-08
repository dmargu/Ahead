import React from 'react';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { colors, scaledSize } from '../src/styles';

export const homeIcon = (<Ionicons
  name='md-home' size={scaledSize(32)} color={colors.mainLightText}
/>);

export const calendarIcon = (<Ionicons
  name='md-calendar' size={scaledSize(32)} color={colors.mainLightText}
/>);

export const habitIcon = (<Ionicons
  name='md-repeat' size={scaledSize(32)} color={colors.mainLightText}
/>);

export const classesIcon = (<MaterialCommunityIcons
  name='teach' size={scaledSize(32)} color={colors.mainLightText}
/>);

export const homeworkIcon = (<FontAwesome
  name='pencil-square-o' size={scaledSize(32)} color={colors.mainLightText}
/>);

export const testIcon = (<Ionicons
  name='ios-paper' size={scaledSize(32)} color={colors.mainLightText}
/>);

export const settingsIcon = (<Ionicons
  name='md-settings' size={scaledSize(32)} color={colors.mainLightText}
/>);

export const todoIcon = (<Ionicons
  name='md-clipboard' size={scaledSize(32)} color={colors.mainLightText}
/>);

export const aheadArrow = (<Ionicons
  name='md-arrow-round-forward' size={100} color={colors.mainLightText}
/>);
