import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from '../../components';
import {NavBar} from '_components';
import {MarketplaceList, FavouritesList} from './components';
import {API} from 'aws-amplify';
import {
  getRetailerCompany,
  listProductListings,
  productListingByNameStartingWithLowestPrice,
} from '../../../../graphql/queries';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {MenuButton} from '_components';

export const Marketplace = props => {
  const [choice, setChoice] = useState('favourites');
  const [productsList, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [initialRender, setInitialRender] = useState(true);
  const [searchPressed, setSearchPressed] = useState(false);
  const [favourites, setFavourites] = useState(
    props.user.retailerCompany.favouriteStores,
  );
  const [refreshing, setRefreshing] = useState(false);
  console.log('marketplace initial render' + props.user);
  const fetchFavourites = async () => {
    const favourites = await API.graphql({
      query: getRetailerCompany,
      variables: {id: props.user.retailerCompanyID},
    });
  };

  const fetchProducts = async () => {
    try {
      const products = await API.graphql({
        query: productListingByNameStartingWithLowestPrice,
        variables: {
          productName: searchValue.toUpperCase(),
          sortDirection: 'ASC',
        },
      });
      console.log(products);
      if (products.data.productListingByNameStartingWithLowestPrice) {
        console.log('Products: \n');
        console.log(
          products.data.productListingByNameStartingWithLowestPrice.items,
        );
        setProducts(
          products.data.productListingByNameStartingWithLowestPrice.items,
        );
      }
    } catch (e) {
      console.log(e);
      console.log("there's a problem");
    }
  };
  useEffect(() => {
    if (searchPressed && choice == 'product') {
      console.log('useEffectTriggered');
      console.log('searching for ' + searchValue);
      setSearchPressed(false);
      fetchProducts();
    }
    //potentially do a search for favourites but must have a way to remove the filter
  }, [searchPressed]);
  useEffect(() => {
    console.log('resetting search');
    setSearchValue('');
  }, [choice]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
      }}>
      {/*<View
        style={{
          flexDirection: 'row',
          width: wp('100%'),
          height: hp('6%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            top: hp('1%'),
            left: wp('5%'),
          }}>
          <MenuButton
            navigation={props.navigation}
            updateAuthState={props.updateAuthState}
            userType={props.user.role}></MenuButton>
        </View>
        <Text style={[Typography.header, {}]}>{Strings.localMarketplace}</Text>
        </View>*/}
      <View style={{top: hp('1%')}}>
        <Searchbar
          setSearchPressed={setSearchPressed}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </View>
      <View
        style={{
          top: hp('3%'),
          width: wp('100%'),
          height: hp('4%'),
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: Colors.GRAY_LIGHT,
        }}>
        {choice == 'product' ? (
          <View
            style={{
              width: wp('50%'),
              borderRightWidth: 1,
              borderColor: Colors.GRAY_LIGHT,
              alignItems: 'center',
            }}>
            <Text
              style={[
                Typography.normal,
                {
                  color: Colors.GRAY_DARK,
                  fontFamily: 'Poppins-Bold',
                  textDecorationLine: 'underline',
                },
              ]}>
              {Strings.product}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => [setChoice('product'), setInitialRender(true)]}
            style={{
              width: wp('50%'),
              borderRightWidth: 1,
              borderColor: Colors.GRAY_LIGHT,
              alignItems: 'center',
            }}>
            <Text style={Typography.normal}>{Strings.product}</Text>
          </TouchableOpacity>
        )}

        {choice == 'favourites' ? (
          <View
            style={{
              width: wp('50%'),
              borderLeftWidth: 1,
              borderColor: Colors.GRAY_LIGHT,
              alignItems: 'center',
            }}>
            <Text
              style={[
                Typography.normal,
                {
                  color: Colors.GRAY_DARK,
                  fontFamily: 'Poppins-Bold',
                  textDecorationLine: 'underline',
                },
              ]}>
              {Strings.favourites}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setChoice('favourites')}
            style={{
              width: wp('50%'),
              borderLeftWidth: 0.5,
              borderColor: Colors.GRAY_LIGHT,
              alignItems: 'center',
            }}>
            <Text style={Typography.normal}>{Strings.favourites}</Text>
          </TouchableOpacity>
        )}
      </View>
      {choice == 'favourites' ? (
        <View
          style={{
            width: wp('95%'),
            height: hp('90%'),
            top: hp('1%'),
          }}>
          <FavouritesList
            data={props.user.retailerCompany.favouriteStores}
            navigation={props.navigation}
          />
        </View>
      ) : (
        <View
          style={{
            width: wp('95%'),
            height: hp('90%'),
            top: hp('1%'),
          }}>
          <MarketplaceList
            chatGroups={props.user.retailerCompany.chatGroups.items}
            productList={productsList}
            navigation={props.navigation}
            user={props.user}
            searchValue={searchValue}
          />
        </View>
      )}

      {/*<View style={{position: 'absolute', top: hp('80%')}}>
        <NavBar navigation={props.navigation} />
        </View>*/}
    </SafeAreaView>
  );
};
