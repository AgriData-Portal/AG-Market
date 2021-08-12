import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';

import {MarketplaceList, PurchaseOrderButton} from './components';

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
import {BlueButton} from '_components';
import {log} from '_utils';

export const Store = props => {
  const {itemId} = props.route.params; //supplierid
  const [products, setProducts] = useState([]);
  const [POList, setPOList] = useState([]);
  const [storeName, setStoreName] = useState('');
  const [trigger, setTrigger] = useState(false);
  const retailerID = props.user.retailerCompanyID;
  log('retailer id:' + retailerID);
  const purchaseOrder = retailerID + itemId;
  log('purchase Order:' + purchaseOrder);
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    log('Fetching Products from ' + itemId);
    fetchProducts();
    log('Fetching PO from ' + purchaseOrder);
    getPOList();
  }, []);

  const getPOList = async () => {
    log('gettingPO');
    try {
      const list = await API.graphql({
        query: purchaseOrderItems,
        variables: {purchaseOrderID: purchaseOrder},
      });
      log(list.data.purchaseOrderItems.items);
      setPOList(list.data.purchaseOrderItems.items);
    } catch {
      e => log(e);
    }
  };

  const fetchProducts = async () => {
    const supplier = await API.graphql({
      query: getSupplierCompany,
      variables: {id: itemId},
    });
    log(supplier.data.getSupplierCompany.listings.items);
    setProducts(supplier.data.getSupplierCompany.listings.items);
    setStoreName(supplier.data.getSupplierCompany.name);
  };

  const updateFavourites = async () => {
    try {
      var currentFavList = props.user.retailerCompany.favouriteStores;
      if (currentFavList != null) {
        currentFavList.push({id: itemId, name: storeName});
        var updated = await API.graphql({
          query: updateRetailerCompany,
          variables: {
            input: {
              id: props.user.retailerCompanyID,
              favouriteStores: currentFavList,
            },
          },
        });
        setIsFavourite(true);
        log('success');
      } else {
        var updated = await API.graphql({
          query: updateRetailerCompany,
          variables: {
            input: {
              id: props.user.retailerCompanyID,
              favouriteStores: [{id: itemId, name: storeName}],
            },
          },
        });
        setIsFavourite(true);
        log('success');
      }
    } catch (e) {
      log(e);
    }
  };

  const unfavourite = async () => {
    try {
      var currentFavList = props.user.retailerCompany.favouriteStores;
      log(currentFavList.length);
      currentFavList.forEach((item, index, arr) => {
        if (item.id == itemId) {
          arr.splice(index, 1);
        }
      });
      log(currentFavList.length);
      var updated = await API.graphql({
        query: updateRetailerCompany,
        variables: {
          input: {
            id: props.user.retailerCompanyID,
            favouriteStores: currentFavList,
          },
        },
      });
      setIsFavourite(false);
      log('success');
    } catch (e) {
      log(e);
    }
  };

  const checkIsFavourite = () => {
    var tempList = props.user.retailerCompany.favouriteStores;
    if (tempList != null) {
      tempList = tempList.filter(item => {
        return item.id == itemId;
      });
      if (tempList.length == 0) {
        setIsFavourite(false);
      } else setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  };

  useEffect(() => {
    checkIsFavourite();
  }, []);

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
          width: wp('93%'),
          height: hp('70%'),
        }}>
        <MarketplaceList
          navigation={props.navigation}
          productList={products}
          POList={POList}
          setPOList={setPOList}
          storeName={storeName}
          purchaseOrder={purchaseOrder}
          user={props.user}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      </View>
      {isFavourite ? (
        <BlueButton
          onPress={() => unfavourite()}
          text={'Favourited'}
          font={Typography.normal}
          backgroundColor={'gold'}
          borderRadius={10}
          paddingVertical={hp('1.5%')}
          top={Platform.OS === 'ios' ? hp('3%') : hp('1%')}
          left={wp('25%')}
          minWidth={wp('44%')}
        />
      ) : (
        <BlueButton
          onPress={() => updateFavourites()}
          backgroundColor={Colors.GRAY_MEDIUM}
          text={'Add to Favourites'}
          top={Platform.OS === 'ios' ? hp('3%') : hp('1%')}
          left={wp('25%')}
          minWidth={wp('44%')}
          font={Typography.normal}
          paddingVertical={hp('1.5%')}
          borderRadius={10}
        />
      )}
      <View
        style={{
          position: 'absolute',
          right: wp('2.5%'),
          bottom: hp('14%'),
        }}>
        <PurchaseOrderButton
          navigation={props.navigation}
          purchaseOrder={purchaseOrder}
          storeName={storeName}
          storeID={itemId}
          POList={POList}
          setPOList={setPOList}
          user={props.user}
          trigger={trigger}
        />
      </View>
    </SafeAreaView>
  );
};
