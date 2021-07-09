import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from '../../components';
import {MarketplaceList, PurchaseOrderButton} from './components';
import {NavBar, BackButton} from '_components';
import {API, Storage} from 'aws-amplify';
import {
  getSupplierCompany,
  purchaseOrderItems,
} from '../../../../graphql/queries';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {updateRetailerCompany} from '../../../../graphql/mutations';
import Strings from '_utils';
import {template} from '@babel/core';

export const Store = props => {
  const {itemId} = props.route.params; //supplierid
  const [products, setProducts] = useState([]);
  const [POList, setPOList] = useState([]);
  const [storeName, setStoreName] = useState('');
  const retailerID = props.user.retailerCompanyID;
  console.log('retailer id:' + retailerID);
  const purchaseOrder = retailerID + itemId;
  console.log('purchase Order:' + purchaseOrder);
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    console.log('Fetching Products from ' + itemId);
    fetchProducts();
    console.log('Fetching PO from ' + purchaseOrder);
    getPOList();
  }, []);

  const getPOList = async () => {
    console.log('gettingPO');
    try {
      const list = await API.graphql({
        query: purchaseOrderItems,
        variables: {purchaseOrderID: purchaseOrder},
      });
      console.log(list.data.purchaseOrderItems.items);
      setPOList(list.data.purchaseOrderItems.items);
    } catch {
      e => console.log(e);
    }
  };

  const fetchProducts = async () => {
    const supplier = await API.graphql({
      query: getSupplierCompany,
      variables: {id: itemId},
    });
    console.log(supplier.data.getSupplierCompany.listings.items);
    setProducts(supplier.data.getSupplierCompany.listings.items);
    setStoreName(supplier.data.getSupplierCompany.name);
  };

  const updateFavourites = async () => {
    try {
      var currentFavList = props.user.retailerCompany.favouriteStores;
      currentFavList.push({id: itemId, name: storeName});
      const updated = await API.graphql({
        query: updateRetailerCompany,
        variables: {
          input: {
            id: props.user.retailerCompanyID,
            favouriteStores: currentFavList,
          },
        },
      });
      setIsFavourite(true);
      console.log('success');
    } catch (e) {
      console.log(e);
    }
  };

  const checkIsFavourite = () => {
    var tempList = props.user.retailerCompany.favouriteStores;
    tempList = tempList.filter(item => {
      return item.id == itemId;
    });
    if (tempList.length == 0) {
      return false;
    } else return true;
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          left: wp('5%'),
          top: hp('4%'),
        }}>
        <BackButton navigation={props.navigation} />
      </View>
      <Text style={[Typography.header, {top: hp('4%')}]}>{storeName}</Text>
      {checkIsFavourite() || isFavourite ? (
        <View style={{position: 'absolute', right: wp('5%'), top: hp('4%')}}>
          <Icon color="gold" name="star-outline" size={wp('7%')} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => updateFavourites()}
          style={{position: 'absolute', right: wp('5%'), top: hp('4%')}}>
          <Icon name="star-outline" size={wp('7%')} />
        </TouchableOpacity>
      )}
      <View
        style={{
          width: wp('93%'),
          height: hp('70%'),
          top: hp('10%'),
        }}>
        <MarketplaceList
          productList={products}
          POList={POList}
          setPOList={setPOList}
          purchaseOrder={purchaseOrder}
          user={props.user}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          right: wp('5%'),
          bottom: hp('13%'),
        }}>
        <PurchaseOrderButton
          purchaseOrder={purchaseOrder}
          storeName={storeName}
          storeID={itemId}
          POList={POList}
          setPOList={setPOList}
          user={props.user}
        />
      </View>

      <View style={{position: 'absolute', top: hp('90%')}}>
        <NavBar navigation={props.navigation} />
      </View>
    </SafeAreaView>
  );
};
