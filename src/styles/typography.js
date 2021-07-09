import {scaleFont} from './mixins';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'Poppins-Medium';
export const FONT_FAMILY_BOLD = 'Poppins-Bold';

// FONT SIZE
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

const divide = num => {
  return num / 6;
};
// FONT STYLE
export const header = {
  fontSize: RFPercentage(divide(20)),
  fontFamily: 'Poppins-SemiBold',
  color: 'black',
};

export const placeholder = {
  fontSize: RFPercentage(divide(12)),
  fontFamily: 'Poppins-Medium',
  color: 'grey',
};

export const placeholderSmall = {
  fontSize: RFPercentage(divide(8)),
  fontFamily: 'Poppins-Medium',
  color: 'grey',
};

export const normal = {
  fontSize: RFPercentage(divide(12)),
  fontFamily: 'Poppins-Medium',
  color: 'black',
};

export const small = {
  fontSize: RFPercentage(divide(10)),
  fontFamily: 'Poppins-Medium',
  color: 'black',
};

export const largestSize = {
  fontSize: RFPercentage(divide(30)),
  fontFamily: 'Poppins-Bold',
  color: 'black',
};

export const welcome = {
  fontSize: RFPercentage(divide(25)),
  fontFamily: 'Poppins-Bold',
  color: '#444443',
};

export const large = {
  fontSize: RFPercentage(divide(15)),
  fontFamily: 'Poppins-SemiBold',
  color: '#444443',
};

export const medium = {
  fontSize: RFPercentage(divide(12)),
  fontFamily: 'Poppins-Regular',
  color: '#444443',
};
