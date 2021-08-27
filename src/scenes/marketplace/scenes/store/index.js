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
  getFarmerCompany,
} from '../../../../graphql/queries';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  updateRetailerCompany,
  updateSupplierCompany,
} from '../../../../graphql/mutations';
import {BlueButton} from '_components';
import {log} from '_utils';
import {companyStore} from '_store';
import {marketPlace} from '_utils';

export const Store = props => {
  const {itemId} = props.route.params; //supplierid
  const [products, setProducts] = useState([]);
  const [POList, setPOList] = useState([]);
  const [storeName, setStoreName] = useState('');
  const [trigger, setTrigger] = useState(false);

  const companyType = companyStore(state => state.companyType);
  const companyID = companyStore(state => state.companyID);
  const companyFavouriteStores = companyStore(
    state => state.companyFavouriteStores,
  );

  const purchaseOrder = companyID + itemId;

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    log('Fetching Products from ' + itemId);

    marketPlace
      .fetchStoreProducts(companyType, itemId)
      .then(data => [
        setProducts(data.listings.items),
        setStoreName(data.name),
      ]);
    log('Fetching PO from ' + purchaseOrder);
    getPOList();
  }, [itemId]);

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

  const checkIsFavourite = () => {
    var tempList = companyFavouriteStores;
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
          onPress={() =>
            marketPlace
              .unfavourite(companyFavouriteStores, itemId, companyID)
              .then(setIsFavourite(false))
          }
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
          onPress={() =>
            marketPlace
              .updateFavourites(
                companyFavouriteStores,
                itemId,
                storeName,
                companyID,
                companyType,
              )
              .then(setIsFavourite(true))
          }
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
          company={props.company}
          trigger={trigger}
        />
      </View>
    </SafeAreaView>
  );
};
