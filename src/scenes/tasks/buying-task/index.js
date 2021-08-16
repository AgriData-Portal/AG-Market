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
import {ReceiveList, UploadReceiptList} from './components';
import {NavBar} from '_components';
import Modal from 'react-native-modal';
import {API} from 'aws-amplify';
import {
  goodsTaskForRetailerByDate,
  paymentsTaskForRetailerByDate,
  goodsTaskFarmerForSupplierByDate,
  paymentsTaskFarmerForSupplierByDate,
} from '../../../graphql/queries';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {MenuButton} from '_components';
import {log} from '_utils';
import {RatingModal} from './components/receive-goods';
import {userStore} from '_store';

export const BuyerTask = props => {
  const [sortModal, setSortModal] = useState(false);
  const [task, setTask] = useState('receive');
  const [receiveTask, setReceiveTask] = useState([]);
  const [payTask, setPayTask] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const companyType = userStore(state => state.companyType);
  const companyID = userStore(state => state.companyID);
  const roleInCompany = userStore(state => state.roleInCompany);

  useEffect(() => {
    if (task == 'pay') {
      getPayTask();
    } else if (task == 'receive') {
      getReceiveTask();
    }
  }, [task]);

  const getReceiveTask = async () => {
    try {
      if (companyType == 'retailer') {
        const task = await API.graphql({
          query: goodsTaskForRetailerByDate,
          variables: {
            retailerID: companyID,
            sortDirection: 'ASC',
          },
        });
        log(task.data.goodsTaskForRetailerByDate.items);
        setReceiveTask(task.data.goodsTaskForRetailerByDate.items);
      } else {
        const task = await API.graphql({
          query: goodsTaskFarmerForSupplierByDate,
          variables: {
            supplierID: companyID,
            sortDirection: 'ASC',
          },
        });
        log(task.data.goodsTaskFarmerForSupplierByDate.items);
        setReceiveTask(task.data.goodsTaskFarmerForSupplierByDate.items);
      }
      log('goods task');
    } catch (e) {
      log(e);
    }
  };

  const getPayTask = async () => {
    try {
      if (companyType == 'retailer') {
        const task = await API.graphql({
          query: paymentsTaskForRetailerByDate,
          variables: {
            retailerID: companyID,
            sortDirection: 'ASC',
          },
        });
        log(task.data.paymentsTaskForRetailerByDate.items);
        setPayTask(task.data.paymentsTaskForRetailerByDate.items);
      } else {
        const task = await API.graphql({
          query: paymentsTaskFarmerForSupplierByDate,
          variables: {
            supplierID: companyID,
            sortDirection: 'ASC',
          },
        });
        log(task.data.paymentsTaskFarmerForSupplierByDate.items);
        setPayTask(task.data.paymentsTaskFarmerForSupplierByDate.items);
      }
      log('payment task');
    } catch (e) {
      log(e);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
      }}>
      {roleInCompany == 'receiver' ? (
        <View
          style={{
            top: hp('0%'),
          }}>
          <Text
            style={[
              Typography.normal,
              {
                color: 'black',
                fontFamily: 'Poppins-Bold',
              },
            ]}>
            {Strings.toRecieve}
          </Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          {task == 'receive' ? (
            <View
              style={{
                right: wp('15%'),
                top: hp('0%'),
              }}>
              <Text
                style={[
                  Typography.normal,
                  {
                    color: 'black',
                    fontFamily: 'Poppins-Bold',
                  },
                ]}>
                {Strings.toRecieve}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setTask('receive')}
              style={{
                right: wp('15%'),
                top: hp('0%'),
              }}>
              <Text style={[Typography.normal, {color: 'grey'}]}>
                {Strings.toRecieve}
              </Text>
            </TouchableOpacity>
          )}
          {task == 'pay' ? (
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
                    fontFamily: 'Poppins-Bold',
                  },
                ]}>
                {Strings.toPay}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setTask('pay')}
              style={{
                top: hp('0%'),
                left: wp('15%'),
              }}>
              <Text style={[Typography.normal, {color: 'grey'}]}>
                {Strings.toPay}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
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
        {task == 'pay' ? (
          <UploadReceiptList
            UploadReceiptList={payTask}
            trigger={trigger}
            setTrigger={setTrigger}
            payTask={payTask}
            setPayTask={setPayTask}
            getPayTask={getPayTask}
          />
        ) : (
          <ReceiveList
            trigger={trigger}
            setTrigger={setTrigger}
            receiveTask={receiveTask}
            setReceiveTask={setReceiveTask}
            getReceiveTask={getReceiveTask}
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
    </SafeAreaView>
  );
};
