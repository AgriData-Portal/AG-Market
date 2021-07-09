import {scaleWidth, scaleHeight} from './mixins';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const SCALE_18 = scaleWidth(18);
export const SCALE_16 = scaleWidth(16);
export const SCALE_12 = scaleWidth(12);
export const SCALE_8 = scaleWidth(8);

export const BackButtonLeft = wp('6%');
export const BackButtonTop = hp('3%');
