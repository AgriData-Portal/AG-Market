import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {CloseButton} from '_components';
import {
  QuotationItemsContext,
  QuotationItemsProvider,
} from './quotationContext';
import {API, Storage} from 'aws-amplify';
import {
  createMessage,
  createOrderQuotation,
  deleteChatGroupUsers,
  updateOrderQuotation,
  updateChatGroup,
  createGoodsTask,
} from '../../../../graphql/mutations';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  getOrderQuotation,
  listUsersInChat,
  purchaseOrderItems,
} from '../../../../graphql/queries';

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

export {ChatBubbleList, ChatInfo};

export const MessageInput = props => {
  const [message, setMessage] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [recording, setRecording] = useState(null);
  const audioRecorderPlayer = new AudioRecorderPlayer();

  function selectImage() {
    let options = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImageSource(response.assets[0].uri);
        setImageModal(true);
      }
    });
  }
  onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecording({
        recordSecs: e.currentPosition,
      });
      return;
    });
    console.log(result);
  };

  onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecording({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setRecording({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };
  const createNewMessage = async () => {
    console.log('creating new message');
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
      /*var messages = props.messages;
      messages = messages.reverse();
      messages.push(newMessage.data.createMessage);
      messages = messages.reverse();
      props.setMessages(messages); */
      setMessage('');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <DismissKeyboardView>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            height: hp('7%'),
            borderRadius: 40,
            backgroundColor: Colors.GRAY_LIGHT,
            flexDirection: 'row',
            justifyContent: 'center',
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
              width: wp('65%'),
              height: hp('7%'),
              borderBottomColor: 'transparent',
              left: wp('14%'),
              color: 'black',
              top: hp('2%'),
            }}
          />
          <TouchableOpacity
            onPress={() => onStartRecord()}
            style={{
              height: hp('9%'),
              width: hp('9%'),

              left: wp('7%'),
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
            <Icon name="mic-outline" size={wp('6%')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              selectImage();
            }}
            style={{
              height: hp('8%'),
              width: hp('8%'),

              right: wp('4%'),
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
            <Icon name="images-outline" size={wp('6%')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (message.length > 0) {
              createNewMessage();
            }
          }}
          style={{
            height: hp('5.5%'),
            width: hp('5.5%'),
            borderRadius: 100,
            top: hp('1%'),
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
    </DismissKeyboardView>
  );
};

const PreviewImageModal = props => {
  const uploadImage = async () => {
    try {
      let photo = props.imageSource;
      console.log(photo);
      const response = await fetch(photo);
      const blob = await response.blob();
      console.log('FileName: \n');
      var fileName = props.chatGroupID + dayjs().format('YYYYMMDDhhmmss');
      await Storage.put(fileName, blob, {
        contentType: 'image/jpeg',
      });
      console.log(props.userID, props.chatGroupID, props.userName, fileName);
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
      /*var messages = props.messages;
      messages = messages.reverse();
      messages.push(newMessage.data.createMessage);
      messages = messages.reverse();
      props.setMessages(messages); */

      props.setImageModal(false);
    } catch (e) {
      console.log(e);
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
