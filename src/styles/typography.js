import {scaleFont} from './mixins';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'Poppins-Medium';
export const FONT_FAMILY_BOLD = 'Poppins-Bold';

// FONT SIZE
// export const FONT_SIZE_16 = scaleFont(16);
// export const FONT_SIZE_14 = scaleFont(14);
// export const FONT_SIZE_12 = scaleFont(12);

// LINE HEIGHT
// export const LINE_HEIGHT_24 = scaleFont(24);
// export const LINE_HEIGHT_20 = scaleFont(20);
// export const LINE_HEIGHT_16 = scaleFont(16);

const divide = num => {
  return num / 6;
};

const byWidth = num => {
  num = parseFloat(num / 3.1);
  num = num.toString() + '%';
  return wp(num);
};
// FONT STYLE
export const header = {
  fontSize: byWidth(20), //RFPercentage(divide(20)),
  fontFamily: 'Poppins-SemiBold',
  color: 'black',
};

export const placeholder = {
  fontSize: byWidth(12), //RFPercentage(divide(12)),
  fontFamily: 'Poppins-Medium',
  color: 'grey',
};

export const placeholderSmall = {
  fontSize: byWidth(8), //RFPercentage(divide(8)),
  fontFamily: 'Poppins-Medium',
  color: 'grey',
};

export const normal = {
  fontSize: byWidth(12), //RFPercentage(divide(12)),
  fontFamily: 'Poppins-Medium',
  color: 'black',
};

export const small = {
  fontSize: byWidth(10), //RFPercentage(divide(10)),
  fontFamily: 'Poppins-Medium',
  color: 'black',
};

export const largestSize = {
  fontSize: byWidth(30), //RFPercentage(divide(30)),
  fontFamily: 'Poppins-Bold',
  color: 'black',
};

export const welcome = {
  fontSize: byWidth(25), //RFPercentage(divide(25)),
  fontFamily: 'Poppins-Bold',
  color: '#444443',
};

export const large = {
  fontSize: byWidth(15), //RFPercentage(divide(15)),
  fontFamily: 'Poppins-SemiBold',
  color: '#444443',
};

export const medium = {
  fontSize: byWidth(12), //RFPercentage(divide(12)),
  fontFamily: 'Poppins-Regular',
  color: '#444443',
};
