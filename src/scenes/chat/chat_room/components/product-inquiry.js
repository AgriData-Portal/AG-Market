import React from 'react';
import {View, Text, Image} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';

import {CloseButton} from '_components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

// export const ProductInquiry2 = props => {
//   return (
//     <View
//       style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <View
//         style={{
//           alignItems: 'center',
//           backgroundColor: Colors.GRAY_LIGHT,
//           borderWidth: 1,
//           borderColor: Colors.GRAY_MEDIUM,
//           width: wp('70%'),
//           height: hp('45%'),
//           borderRadius: 10,
//         }}>
//         <View
//           style={{
//             position: 'absolute',
//             right: wp('2%'),
//             top: hp('1%'),
//           }}>
//           <CloseButton setModal={props.setProductInquiry} />
//         </View>
//         <Image
//           style={{
//             width: wp('45%'),
//             resizeMode: 'contain',
//             top: hp('2%'),
//             height: hp('20%'),
//           }}
//           source={require('_assets/images/agridata.png')}></Image>

//         <Text
//           style={[
//             Typography.large,
//             {
//               top: hp('1%'),
//               textAlign: 'center',
//             },
//           ]}>
//           Product
//         </Text>
//         <View
//           style={{
//             backgroundColor: Colors.PALE_GREEN,
//             width: wp('50%'),
//             height: hp('15%'),
//             alignItems: 'center',
//             top: hp('2%'),
//             borderRadius: 10,
//           }}>
//           <Text
//             style={[
//               Typography.normal,
//               {
//                 top: hp('3%'),
//               },
//             ]}>
//             {Strings.price}: <Text style={{color: 'red'}}> RM5-8/kg</Text>{' '}
//             {'\n'}
//             MOQ: 50 {'\n'}
//             {Strings.available}: 1000
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };
