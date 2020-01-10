import { Dimensions } from 'react-native';

export const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const { width, height } = Dimensions.get('window');

// Use iPhone6-8 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = (size) => Math.ceil((size * scale));


export const colors = {
  mainDark: '#0c1419',
  mainRed: '#ff3366',
  darkRed: '#A31621',
  green: '#23CE6B',
  mainLightText: '#b6c3cc',
  lightGrey: '#677e8c',
  darkGrey: '#4c6472',
  mainGreyBackground: '#e2e8ed',
  white: '#FFFFFF'
};

export const fonts = {
  fontFamily: 'Helvetica',
  normalText: scaledSize(15),
  headerText: scaledSize(20),
  subtitleText: scaledSize(14),
  buttonText: scaledSize(17)
};
