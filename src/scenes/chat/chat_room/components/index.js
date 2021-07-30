import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Text,
  PermissionsAndroid,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {API, Storage} from 'aws-amplify';
import {
  createMessage,
  updateChatGroup,
  createGoodsTask,
} from '../../../../graphql/mutations';
import {BlueButton} from '_components';
// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSet,
//   AudioSourceAndroidType,
// } from 'react-native-audio-recorder-player';
import {
  getOrderQuotation,
  listUsersInChat,
  purchaseOrderItems,
} from '../../../../graphql/queries';
import {log} from '_utils';

var dayjs = require('dayjs');

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {ChatBubbleList} from './chat-bubbles';
import {ChatInfo} from './chat-info';
import {launchImageLibrary} from 'react-native-image-picker';
import {DismissKeyboardView} from '_components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export {ChatBubbleList, ChatInfo};

// const audioRecorderPlayer = new AudioRecorderPlayer();

export const MessageInput = props => {
  const [message, setMessage] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [recording, setRecording] = useState({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
  const [audio, setAudio] = useState(false);
  const [whenMicPressed, setMicPressed] = useState(false);

  // audioRecorderPlayer.setSubscriptionDuration(0.09);

  function selectImage() {
    let options = {
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        log('User cancelled photo picker');
      } else if (response.error) {
        log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        log('User tapped custom button: ', response.customButton);
      } else {
        setImageSource(response.assets[0].uri);
        setImageModal(true);
      }
    });
  }
  // onSlideRight = () => {
  //   onStopRecord();
  // };
  // onStartRecord = async () => {
  //   const path = 'hello.mp4';
  //   const audioSet = {
  //     AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  //     AudioSourceAndroid: AudioSourceAndroidType.MIC,
  //     AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  //     AVNumberOfChannelsKeyIOS: 2,
  //     AVFormatIDKeyIOS: AVEncodingOption.aac,
  //   };
  //   log('audioSet', audioSet);
  //   const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
  //   audioRecorderPlayer.addRecordBackListener(e => {
  //     setRecording({
  //       recordSecs: e.current_position,
  //       recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
  //     });
  //   });
  //   log(`uri: ${uri}`);
  // };

  // onStopRecord = async () => {
  //   const result = await audioRecorderPlayer.stopRecorder();
  //   audioRecorderPlayer.removeRecordBackListener();
  //   setRecording({
  //     recordSecs: 0,
  //   });
  //   log(result);
  // };

  // onStartPlay = async () => {
  //   log('onStartPlay');
  //   const path = 'hello.mp4';
  //   const msg = await audioRecorderPlayer.startPlayer(path);
  //   audioRecorderPlayer.setVolume(1.0);
  //   log(msg);
  //   audioRecorderPlayer.addPlayBackListener(e => {
  //     if (e.current_position === e.duration) {
  //       log('finished');
  //       audioRecorderPlayer.stopPlayer();
  //     }
  //     setRecording({
  //       currentPositionSec: e.currentPosition,
  //       currentDurationSec: e.duration,
  //       playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
  //       duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
  //     });
  //   });
  // };

  // onPausePlay = async () => {
  //   await audioRecorderPlayer.pausePlayer();
  // };

  // onStopPlay = async () => {
  //   log('onStopPlay');
  //   audioRecorderPlayer.stopPlayer();
  //   audioRecorderPlayer.removePlayBackListener();
  // };
  const createNewMessage = async () => {
    log('creating new message');
    try {
      const newMessage = await API.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: props.userID,
            chatGroupID: props.chatGroupID,
            sender: props.userName,
            type: 'text',
            content: message,
          },
        },
      });
      const updateChat = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.chatGroupID,
            mostRecentMessage: message,
            mostRecentMessageSender: props.userName,
          },
        },
      });
    } catch (e) {
      log(e);
    }
    setMessage('');
    setSendButtonDisabled(false);
  };
  return (
    <KeyboardAwareScrollView
      extraHeight={Platform.OS == 'ios' ? hp('6%') : 0}
      enableAutomaticScroll={true}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: hp('6%'),
            borderRadius: 40,
            backgroundColor: Colors.GRAY_LIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            width: wp('80%'),
          }}>
          <TextInput
            placeholderTextColor={Colors.GRAY_DARK}
            placeholder={Strings.typeMessage}
            underlineColorAndroid={'transparent'}
            multiline={true}
            onChangeText={text => setMessage(text)}
            value={message}
            style={{
              width: wp('60%'),
              height: hp('7%'),
              borderBottomColor: 'transparent',
              left: wp('2%'),
              color: 'black',
            }}
          />
          {/* <TouchableOpacity
            onPressIn={() => [onStartRecord(), setMicPressed(true)]}
            onPressOut={() => [onStopRecord(), setAudio(true)]}
            style={{
              height: hp('9%'),
              width: hp('9%'),

              left: wp('5%'),
              top: hp('2%'),

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Icon name="mic-outline" size={wp('7%')} />
          </TouchableOpacity>
          {whenMicPressed ? (
            <Text
              style={{
                position: 'absolute',
                left: wp('40%'),
                top: hp('2.5%'),
                width: wp('17%'),
              }}>
              {recording.recordTime}
            </Text> 
          ) : (
            <View></View>
          )}
          <Modal isVisible={audio}>
            <View
              style={{
                backgroundColor: Colors.GRAY_LIGHT,
                top: hp('45%'),
                height: hp('13%'),
                width: wp('100%'),
                right: wp('5%'),
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => [setMicPressed(false), setAudio(false)]}
                style={{
                  alignSelf: 'center',
                  bottom: hp('1%'),
                  backgroundColor: Colors.PALE_BLUE,
                  height: hp('5.5%'),
                  width: hp('5.5%'),
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  right: wp('10%'),
                }}>
                <Icon name="trash-outline" size={wp('8%')} color="white"></Icon>
              </TouchableOpacity>
              <Text
                style={{
                  right: wp('5%'),
                  top: hp('4%'),
                  width: wp('17%'),
                }}>
                {recording.playTime}
              </Text>
              <TouchableOpacity
                onPress={() => onStartPlay()}
                style={{
                  alignSelf: 'center',
                  bottom: hp('1%'),
                  backgroundColor: Colors.PALE_BLUE,
                  height: hp('5.5%'),
                  width: hp('5.5%'),
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: wp('5%'),
                }}>
                <Icon name="play" size={wp('8%')} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onStopPlay()}
                style={{
                  alignSelf: 'center',
                  bottom: hp('1%'),
                  backgroundColor: Colors.PALE_BLUE,
                  height: hp('5.5%'),
                  width: hp('5.5%'),
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="stop" size={wp('8%')} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: hp('5.5%'),
                  width: hp('5.5%'),
                  borderRadius: 100,
                  top: hp('2.8%'),
                  left: wp('10%'),
                  backgroundColor: Colors.PALE_BLUE,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Icon
                  name="paper-plane-outline"
                  size={wp('6%')}
                  color={Colors.LIGHT_BLUE}
                />
              </TouchableOpacity>
            </View>
          </Modal>*/}
          <TouchableOpacity
            onPress={() => {
              selectImage();
            }}
            style={{
              height: hp('8%'),
              width: hp('8%'),
              right: wp('0%'),
              top: hp('0.5%'),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              position: 'absolute',
            }}>
            <Icon name="images-outline" size={wp('7%')} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (message.length > 0) {
              createNewMessage();
            }
          }}
          onPressIn={() => {
            if (message.length > 0) {
              setSendButtonDisabled(true);
            }
          }}
          disabled={sendButtonDisabled}
          style={{
            height: hp('5.5%'),
            width: hp('5.5%'),
            borderRadius: 100,
            left: wp('3%'),
            backgroundColor: Colors.PALE_BLUE,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Icon
            name="paper-plane-outline"
            size={wp('6%')}
            color={Colors.LIGHT_BLUE}
          />
        </TouchableOpacity>
        <PreviewImageModal
          imageModal={imageModal}
          setImageModal={setImageModal}
          imageSource={imageSource}
          selectImage={selectImage}
          userID={props.userID}
          chatGroupID={props.chatGroupID}
          userName={props.userName}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const PreviewImageModal = props => {
  const uploadImage = async () => {
    try {
      let photo = props.imageSource;
      log(photo);
      const response = await fetch(photo);
      const blob = await response.blob();
      log('FileName: \n');
      var fileName = props.chatGroupID + dayjs().format('YYYYMMDDhhmmss');
      await Storage.put(fileName, blob, {
        contentType: 'image/jpeg',
      });
      log(props.userID, props.chatGroupID, props.userName, fileName);
      const newMessage = await API.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: props.userID,
            chatGroupID: props.chatGroupID,
            sender: props.userName,
            type: 'image',
            content: fileName,
          },
        },
      });
      const updateChat = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.chatGroupID,
            mostRecentMessage: 'Image',
            mostRecentMessageSender: props.userName,
          },
        },
      });

      props.setImageModal(false);
    } catch (e) {
      log(e);
    }
  };
  return (
    <Modal isVisible={props.imageModal}>
      <View>
        {props.imageSource ? (
          <View
            style={{
              width: wp('100%'),
              height: hp('90%'),
            }}>
            <View
              style={{
                top: hp('2%'),
              }}>
              <TouchableOpacity
                style={{
                  width: wp('8%'),
                  backgroundColor: 'white',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => props.setImageModal(false)}>
                <Icon name="arrow-back-outline" size={wp('7%')} />
              </TouchableOpacity>
            </View>
            <Image
              style={{
                width: wp('90%'),
                height: hp('30%'),
                resizeMode: 'contain',
                top: hp('20%'),
              }}
              source={{uri: props.imageSource}}
            />
            <View style={{top: hp('28%'), left: wp('25%')}}>
              <TouchableOpacity
                onPress={() => {
                  uploadImage();
                }}
                style={{
                  backgroundColor: 'white',
                  width: wp('40%'),
                  height: hp('5%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <Text style={[Typography.large]}>SEND IMAGE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </Modal>
  );
};

// <Modal isVisible={audio}>
// <View
//   style={{
//     backgroundColor: Colors.GRAY_LIGHT,
//     top: hp('45%'),
//     height: hp('13%'),
//     width: wp('100%'),
//     right: wp('5%'),
//     justifyContent: 'center',
//     flexDirection: 'row',
//   }}>
//   <TouchableOpacity
//     onPress={() => [setMicPressed(false), setAudio(false)]}
//     style={{
//       alignSelf: 'center',
//       bottom: hp('1%'),
//       backgroundColor: Colors.PALE_BLUE,
//       height: hp('5.5%'),
//       width: hp('5.5%'),
//       borderRadius: 100,
//       justifyContent: 'center',
//       alignItems: 'center',
//       right: wp('10%'),
//     }}>
//     <Icon name="trash-outline" size={wp('8%')} color="white"></Icon>
//   </TouchableOpacity>
//   <Text
//     style={{
//       right: wp('5%'),
//       top: hp('4%'),
//       width: wp('17%'),
//     }}>
//     {recording.playTime}
//   </Text>
//   <TouchableOpacity
//     onPress={() => onStartPlay()}
//     style={{
//       alignSelf: 'center',
//       bottom: hp('1%'),
//       backgroundColor: Colors.PALE_BLUE,
//       height: hp('5.5%'),
//       width: hp('5.5%'),
//       borderRadius: 100,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginRight: wp('5%'),
//     }}>
//     <Icon name="play" size={wp('8%')} color="white" />
//   </TouchableOpacity>
//   <TouchableOpacity
//     onPress={() => onStopPlay()}
//     style={{
//       alignSelf: 'center',
//       bottom: hp('1%'),
//       backgroundColor: Colors.PALE_BLUE,
//       height: hp('5.5%'),
//       width: hp('5.5%'),
//       borderRadius: 100,
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}>
//     <Icon name="stop" size={wp('8%')} color="white" />
//   </TouchableOpacity>
//   <TouchableOpacity
//     style={{
//       height: hp('5.5%'),
//       width: hp('5.5%'),
//       borderRadius: 100,
//       top: hp('2.8%'),
//       left: wp('10%'),
//       backgroundColor: Colors.PALE_BLUE,
//       justifyContent: 'center',
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 3.84,
//       elevation: 5,
//     }}>
//     <Icon
//       name="paper-plane-outline"
//       size={wp('6%')}
//       color={Colors.LIGHT_BLUE}
//     />
//   </TouchableOpacity>
// </View>
// </Modal>

// onStartRecord = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const grants = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       ]);

//       log('write external stroage', grants);

//       if (
//         grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//           PermissionsAndroid.RESULTS.GRANTED &&
//         grants['android.permission.READ_EXTERNAL_STORAGE'] ===
//           PermissionsAndroid.RESULTS.GRANTED &&
//         grants['android.permission.RECORD_AUDIO'] ===
//           PermissionsAndroid.RESULTS.GRANTED
//       ) {
//         log('Permissions granted');
//       } else {
//         log('All required permissions not granted');
//         return;
//       }
//     } catch (err) {
//       console.warn(err);
//       return;
//     }
//   }
//   const path = 'hello.mp4';
//   const audioSet = {
//     AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//     AudioSourceAndroid: AudioSourceAndroidType.MIC,
//     AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//     AVNumberOfChannelsKeyIOS: 2,
//     AVFormatIDKeyIOS: AVEncodingOption.aac,
//   };
//   const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
//   audioRecorderPlayer.addRecordBackListener(e => {
//     setRecording({
//       recordSecs: e.current_position,
//       recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
//     });
//   });
//   log(`uri: ${uri}`);
// };

// onStopRecord = async () => {
//   const result = await audioRecorderPlayer.stopRecorder();
//   audioRecorderPlayer.removeRecordBackListener();
//   setRecording({
//     recordSecs: 0,
//   });
//   log(result);
// };

// onStartPlay = async () => {
//   log('onStartPlay');
//   const path = 'hello.mp4';
//   const msg = await audioRecorderPlayer.startPlayer(path);
//   audioRecorderPlayer.setVolume(1.0);
//   log(msg);
//   audioRecorderPlayer.addPlayBackListener(e => {
//     if (e.current_position === e.duration) {
//       log('finished');
//       audioRecorderPlayer.stopPlayer();
//     }
//     setRecording({
//       currentPositionSec: e.currentPosition,
//       currentDurationSec: e.duration,
//       playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
//       duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
//     });
//   });
// };

// onPausePlay = async () => {
//   await audioRecorderPlayer.pausePlayer();
// };

// onStopPlay = async () => {
//   log('onStopPlay');
//   audioRecorderPlayer.stopPlayer();
//   audioRecorderPlayer.removePlayBackListener();
// };
