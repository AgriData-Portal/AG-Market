import {Dimensions, PixelRatio} from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

export const scaleWidth = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;
export const scaleHeight = size => (WINDOW_HEIGHT / guidelineBaseHeight) * size;

export const scaleFont = size =>
  size * PixelRatio.getFontScale() * (WINDOW_HEIGHT / guidelineBaseHeight);
