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
import {OrderList, SortModal} from './components';
import {NavBar, LoadingModal} from '_components';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API} from 'aws-amplify';
import {
  invoiceForRetailerByDate,
  invoiceRetailerForSupplierByDate,
  invoiceForFarmerByDate,
  invoiceFarmerForSupplierByDate,
} from '../../graphql/queries';
import Strings from '_utils';
import {log} from '_utils';
import {companyStore} from '_store';

export const SellingOrders = props => {
  const [sortModal, setSortModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const [refresh, setRefresh] = useState(0);
  const [nextToken, setNextToken] = useState(null);
  const companyID = companyStore(state => state.companyID);
  const companyType = companyStore(state => state.companyType);

  useEffect(() => {
    log('gettingInvoice');
    getInvoice();
  }, [props.sellerState]);

  useEffect(() => {
    if (nextToken != null) {
      getMoreInvoice();
    }
  }, [refresh]);

  const getInvoice = async () => {
    if (companyType == 'supplier') {
      try {
        const invoice1 = await API.graphql({
          query: invoiceRetailerForSupplierByDate,
          variables: {
            supplierID: companyID,
            sortDirection: 'DESC',
            limit: 20,
          },
        });
        log(invoice1.data.invoiceRetailerForSupplierByDate.items);
        setNextToken(invoice1.data.invoiceRetailerForSupplierByDate.nextToken);
        setInvoiceList(invoice1.data.invoiceRetailerForSupplierByDate.items);
        log('supplierCompanyWithRetailerInvoices');

        setLoading(false);
      } catch (e) {
        log(e);
      }
    } else {
      try {
        const invoice = await API.graphql({
          query: invoiceForFarmerByDate,
          variables: {
            farmerID: companyID,
            sortDirection: 'DESC',
            limit: 20,
          },
        });
        log(invoice.data.invoiceForFarmerByDate.items);
        setInvoiceList(invoice.data.invoiceForFarmerByDate.items);
        setNextToken(invoice.data.invoiceForFarmerByDate.nextToken);
        setLoading(false);
        log('farmerCompanyInvoices');
      } catch (e) {
        log(e);
      }
    }
  };

  const getMoreInvoice = async () => {
    if (companyType == 'supplier') {
      try {
        const invoice = await API.graphql({
          query: invoiceRetailerForSupplierByDate,
          variables: {
            supplierID: companyID,
            sortDirection: 'DESC',
            limit: 20,
            nextToken: nextToken,
          },
        });
        log(invoice.data.invoiceRetailerForSupplierByDate.items);
        setNextToken(invoice.data.invoiceRetailerForSupplierByDate.nextToken);
        setInvoiceList(invoice.data.invoiceRetailerForSupplierByDate.items);
        setLoading(false);
        log('supplierCompanyWithRetailerInvoices');
      } catch (e) {
        log(e);
      }
    } else {
      try {
        const invoice = await API.graphql({
          query: invoiceForFarmerByDate,
          variables: {
            farmerID: companyID,
            sortDirection: 'DESC',
            limit: 20,
            nextToken: nextToken,
          },
        });
        log(invoice.data.invoiceForFarmerByDate.items);
        setInvoiceList(invoice.data.invoiceForFarmerByDate.items);
        setNextToken(invoice.data.invoiceForFarmerByDate.nextToken);
        setLoading(false);
        log('farmerCompanyInvoices');
      } catch (e) {
        log(e);
      }
    }
    log('first run');
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: wp('80%'),
          height: hp('5%'),
          top: hp('0%'),
          flexDirection: 'row',
        }}>
        <Text style={[Typography.normal, {textTransform: 'uppercase'}]}>
          {Strings.results}
        </Text>
        {/* TODO code for sort modal */}
        {/* <TouchableOpacity
          onPress={() => setSortModal(true)}
          style={{position: 'absolute', right: wp('0%')}}>
          <Icon name="funnel-outline" size={wp('5%')}></Icon>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          top: hp('0%'),
          height: hp('72%'),
        }}>
        <OrderList
          invoiceList={invoiceList}
          user={props.user}
          setInvoiceList={setInvoiceList}
          setLoading={setLoading}
          trigger={trigger}
          setTrigger={setTrigger}
          setRefresh={setRefresh}
          sellerState={props.sellerState}
          company={props.company}
        />
      </View>

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
