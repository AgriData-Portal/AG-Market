import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {SortModal} from '../components';
import {SendTaskList, ReceivePaymentTaskList} from './components';
import {NavBar, LoadingModal} from '_components';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API} from 'aws-amplify';
import {
  listGoodsTasks,
  goodsTaskForFarmerByDate,
  paymentsTaskForFarmerByDate,
} from '../../../graphql/queries';
import Strings from '_utils';
import {companyStore} from '_store';
import {log} from '_utils';

export const FarmerTasks = props => {
  const [sendTask, setSendTask] = useState([]);
  const [claimTask, setClaimTask] = useState([]);
  const [sortModal, setSortModal] = useState(false);
  const [task, setTask] = useState('send');
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const companyID = companyStore(state => state.companyID);

  useEffect(() => {
    if (task == 'send' && sendTask.length == 0) {
      getSendTask();
    } else if (task == 'claim' && claimTask.length == 0) {
      getClaimTask();
    }
  }, [task]);
  const getSendTask = async () => {
    setLoading(true);
    try {
      const task = await API.graphql({
        query: goodsTaskForFarmerByDate,
        variables: {
          farmerID: companyID,
          sortDirection: 'ASC',
        },
      });
      setSendTask(task.data.goodsTaskForFarmerByDate.items);
      log(task.data.goodsTaskForFarmerByDate.items);
      log('goods task');
      setLoading(false);
    } catch (e) {
      log(e);
    }
  };

  const getClaimTask = async () => {
    setLoading(true);
    try {
      const task = await API.graphql({
        query: paymentsTaskForFarmerByDate,
        variables: {
          farmerID: companyID,
          sortDirection: 'ASC',
        },
      });
      setClaimTask(task.data.paymentsTaskForFarmerByDate.items);
      log(task.data.paymentsTaskForFarmerByDate.items);
      log('payment task');
      setLoading(false);
    } catch (e) {
      log(e);
    }
  };
  log(sendTask);
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        {task == 'send' ? (
          <View
            style={{
              right: wp('15%'),
              top: hp('0%'),
            }}>
            <Text
              style={[
                Typography.normal,
                {
                  fontFamily: 'Poppins-Bold',
                },
              ]}>
              {Strings.send}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setTask('send')}
            style={{
              right: wp('15%'),
              top: hp('0%'),
            }}>
            <Text
              style={[
                Typography.normal,
                {
                  color: Colors.GRAY_DARK,
                },
              ]}>
              {Strings.send}
            </Text>
          </TouchableOpacity>
        )}
        {task == 'claim' ? (
          <View
            style={{
              left: wp('15%'),
              top: hp('0%'),
            }}>
            <Text
              style={[
                Typography.normal,
                {
                  color: 'black',
                },
              ]}>
              {Strings.claim}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setTask('claim')}
            style={{
              top: hp('0%'),
              left: wp('15%'),
            }}>
            <Text
              style={[
                Typography.normal,
                {
                  fontFamily: 'Poppins-Bold',
                  color: Colors.GRAY_DARK,
                },
              ]}>
              {Strings.claim}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          top: hp('0%'),
          width: wp('100%'),
          borderBottomWidth: wp('0.5%'),
          height: hp('0%'),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
      <View
        style={{
          width: wp('80%'),
          height: hp('5%'),
          top: hp('1%'),
          flexDirection: 'row',
        }}>
        <Text style={[Typography.normal, {textTransform: 'uppercase'}]}>
          {Strings.allResults}
        </Text>
        {/* TODO sortmodal */}
        {/* <TouchableOpacity
          onPress={() => setSortModal(true)}
          style={{position: 'absolute', right: wp('0%')}}>
          <Icon name="funnel-outline" size={wp('5%')}></Icon>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          top: hp('0%'),
          height: hp('68%'),
        }}>
        {task == 'claim' ? (
          <ReceivePaymentTaskList
            data={claimTask}
            trigger={trigger}
            setTrigger={setTrigger}
            claimTask={claimTask}
            setClaimTask={setClaimTask}
            getClaimTask={getClaimTask}
          />
        ) : (
          <SendTaskList
            data={sendTask}
            trigger={trigger}
            setTrigger={setTrigger}
            sendTask={sendTask}
            setSendTask={setSendTask}
            getSendTask={getSendTask}
          />
        )}
      </View>

      {/*<View style={{position: 'absolute', top: hp('80%')}}>
        <NavBar navigation={props.navigation} />
        </View>*/}
      <Modal
        animationIn="fadeIn"
        animationInTiming={100}
        animationOut="fadeOut"
        animationOutTiming={100}
        backdropOpacity={0.4}
        isVisible={sortModal}
        onBackdropPress={() => setSortModal(false)}>
        <SortModal />
      </Modal>
      <LoadingModal isVisible={loading} />
    </SafeAreaView>
  );
};
