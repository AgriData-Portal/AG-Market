import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions, PixelRatio, Text} from 'react-native';
import React from 'react';

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
  var width = Dimensions.get('screen').width;
  var height = Dimensions.get('screen').height;
  // console.log(Math.sqrt(Math.log10(height / width)));
  var aspectRatioLog = Math.sqrt(Math.log10(height / width));
  // console.log(PixelRatio.get());
  var factor = null;
  if (PixelRatio.get() == 1) {
    factor = 1.7 / aspectRatioLog;
  } else if (PixelRatio.get() == 1.5) {
    factor = 1.7 / aspectRatioLog;
  } else if (PixelRatio.get() == 2) {
    factor = 1.7 / aspectRatioLog;
  } else if (PixelRatio.get() == 2.5) {
    factor = 1.7 / aspectRatioLog;
  } else if (PixelRatio.get() == 3) {
    factor = 1.7 / aspectRatioLog;
  } else {
    factor = 1.7 / aspectRatioLog;
  }

  //console.log(height2, width2, height2 / width2);

  num = parseFloat(num / factor);
  num = num.toString() + '%';
  return wp(num);
};

const byWidth2 = num => {
  num = RFPercentage(num / 20);

  return wp(num);
};
// FONT STYLE
export const Header = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(20), //RFPercentage(divide(20)),
        fontFamily: 'Poppins-SemiBold',
        color: 'black',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Placeholder = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(12), //RFPercentage(divide(12)),
        fontFamily: 'Poppins-Medium',
        color: 'grey',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const PlaceholderSmall = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(8), //RFPercentage(divide(8)),
        fontFamily: 'Poppins-Medium',
        color: 'grey',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Normal = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(12), //RFPercentage(divide(12)),
        fontFamily: 'Poppins-Medium',
        color: 'black',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Small = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(10), //RFPercentage(divide(10)),
        fontFamily: 'Poppins-Medium',
        color: 'black',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const LargestSize = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(26), //RFPercentage(divide(30)),
        fontFamily: 'Poppins-Bold',
        color: 'black',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Welcome = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(20), //RFPercentage(divide(25)),
        fontFamily: 'Poppins-Bold',
        color: '#444443',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Large = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(15), //RFPercentage(divide(15)),
        fontFamily: 'Poppins-SemiBold',
        color: '#444443',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const NormalBold = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(12), //RFPercentage(divide(15)),
        fontFamily: 'Poppins-Bold',
        color: '#444443',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export const Medium = ({children, style}) => {
  return (
    <Text
      style={{
        fontSize: byWidth(12), //RFPercentage(divide(12)),
        fontFamily: 'Poppins-Regular',
        color: '#444443',
        ...style,
      }}>
      {children}
    </Text>
  );
};
