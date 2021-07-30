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
} from '../../graphql/queries';
import Strings from '_utils';
import {log} from '_utils';

export const Orders = props => {
  const [sortModal, setSortModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [nextToken, setNextToken] = useState(null);

  useEffect(() => {
    getInvoice();
  }, []);

  useEffect(() => {
    if (nextToken != null) {
      getMoreInvoice();
    }
  }, [refresh]);

  const getInvoice = async () => {
    if (props.user.supplierCompanyID != null) {
      try {
        const invoice = await API.graphql({
          query: invoiceRetailerForSupplierByDate,
          variables: {
            supplierID: props.user.supplierCompanyID,
            sortDirection: 'DESC',
            limit: 20,
          },
        });
        log(invoice.data.invoiceRetailerForSupplierByDate.items);
        setNextToken(invoice.data.invoiceRetailerForSupplierByDate.nextToken);
        setInvoiceList(invoice.data.invoiceRetailerForSupplierByDate.items);
        setLoading(false);
        log('supplierCompanyInvoices');
      } catch (e) {
        log(e);
      }
    } else if (props.user.retailerCompanyID != null) {
      try {
        const invoice = await API.graphql({
          query: invoiceForRetailerByDate,
          variables: {
            retailerID: props.user.retailerCompanyID,
            sortDirection: 'DESC',
            limit: 20,
          },
        });
        log(invoice.data.invoiceForRetailerByDate.items);
        setNextToken(invoice.data.invoiceForRetailerByDate.nextToken);
        setInvoiceList(invoice.data.invoiceForRetailerByDate.items);
        setLoading(false);
        log('retailerCompanyInvoices');
      } catch (e) {
        log(e);
      }
    } else {
      try {
        const invoice = await API.graphql({
          query: invoiceForFarmerByDate,
          variables: {
            farmerID: props.user.farmerCompanyID,
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
    log('first run');
  };

  const getMoreInvoice = async () => {
    if (props.user.supplierCompanyID != null) {
      try {
        const invoice = await API.graphql({
          query: invoiceRetailerForSupplierByDate,
          variables: {
            supplierID: props.user.supplierCompanyID,
            sortDirection: 'DESC',
            limit: 20,
            nextToken: nextToken,
          },
        });
        log(invoice.data.invoiceRetailerForSupplierByDate.items);
        setNextToken(invoice.data.invoiceRetailerForSupplierByDate.nextToken);
        setInvoiceList(invoice.data.invoiceRetailerForSupplierByDate.items);
        setLoading(false);
        log('supplierCompanyInvoices');
      } catch (e) {
        log(e);
      }
    } else if (props.user.retailerCompanyID != null) {
      try {
        const invoice = await API.graphql({
          query: invoiceForRetailerByDate,
          variables: {
            retailerID: props.user.retailerCompanyID,
            sortDirection: 'DESC',
            limit: 20,
            nextToken: nextToken,
          },
        });
        log(invoice.data.invoiceForRetailerByDate.items);
        setNextToken(invoice.data.invoiceForRetailerByDate.nextToken);
        setInvoiceList(oldInvoice =>
          oldInvoice.concat(invoice.data.invoiceForRetailerByDate.items),
        );
        setLoading(false);
        log('retailerCompanyInvoices');
      } catch (e) {
        log(e);
      }
    } else {
      try {
        const invoice = await API.graphql({
          query: invoiceForFarmerByDate,
          variables: {
            farmerID: props.user.farmerCompanyID,
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
        <TouchableOpacity
          onPress={() => setSortModal(true)}
          style={{position: 'absolute', right: wp('0%')}}>
          <Icon name="funnel-outline" size={wp('5%')}></Icon>
        </TouchableOpacity>
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
