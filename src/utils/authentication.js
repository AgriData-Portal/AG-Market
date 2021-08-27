import {API, Auth} from 'aws-amplify';
import {
  createFarmerCompany,
  createSupplierCompany,
  createRetailerCompany,
} from '../graphql/mutations';
import {log} from '_utils';

//login
export const signIn = async (phone, password) => {
  try {
    const user = await Auth.signIn('+6' + phone, password);
    log(user);
    log('Successful sign in');
    return {
      success: true,
      userID: user.username,
      userAttributes: user.attributes,
    };

    //props.updateAuthState('loggedIn'); //fucking weird and old.
  } catch (error) {
    if (error.code == 'UserNotConfirmedException') {
      return {success: false, errorText: 'UserNotConfirmed'};
    } else if (error.code == 'UserNotFoundException') {
      return {
        success: false,
        errorText:
          "Sorry you don't have an account associated with this number. Please register.",
      };
    } else if (error.code == 'NotAuthorizedException') {
      return {
        success: false,
        errorText:
          'Sorry the password you entered is invalid. Please try again.',
      };
    } else if (error.code == 'NetworkError') {
      return {
        success: false,
        errorText:
          'Sorry your network seems to be down. Please try again when internet connectivity has been restored.',
      };
    } else {
      log(JSON.stringify(error), 'red');
      return {
        success: false,
        errorText:
          'Sorry your network seems to be down. Please try again when internet connectivity has been restored.',
      };
    }
    // }, 400);
  }
};

export const signUp = async (
  phone,
  password,
  email,
  name,
  value,
  companyName,
  value2,
  companyRegistrationNum,
  companyAddress,
) => {
  try {
    const user = await Auth.signUp({
      username: '+6' + phone,
      password: password,
      attributes: {
        email: email,
        phone_number: '+6' + phone,
        name: name,
        'custom:role': value,
        'custom:companyName': companyName,
        'custom:companyType': value2,
        'custom:companyRegNum': companyRegistrationNum,
        'custom:companyAddress': companyAddress,
      },
    });
    return 'success';
  } catch (error) {
    log('❌ Error signing up...', error);
    return error.message;
  }
};

export const confirmSignUp = async (phone, authCode) => {
  try {
    const user = await Auth.confirmSignUp(phone, authCode);
    return true;
  } catch (error) {
    return false;
  }
};

export const resendConfirmationCode = async phone => {
  try {
    await Auth.resendSignUp(phone);
    return true;
  } catch (err) {
    return false;
  }
};

export const sendConfirmation = async phone => {
  await Auth.forgotPassword(phone)
    .then(data => {
      log(data);
      log(phone);
    })
    .catch(err => {
      log(err);
      log(phone);
    });
};

export const changePassword = async (phone, code, password) => {
  try {
    await Auth.forgotPasswordSubmit(phone, code, password);
    return true;
  } catch (e) {
    return e.code;
  }
};

// const createNewUser = async () => {
//   var user = null;

//   var companyID = null;
//   try {
//     user = await Auth.currentAuthenticatedUser();
//     log('attempting to fix the problem');
//     log(user.attributes);
//   } catch (e) {
//     log(e);
//   }
//   var type = user.attributes['custom:companyType'];
//   //createing new company
//   try {
//     if (type == 'farm') {
//       var response = await API.graphql({
//         query: createFarmerCompany,
//         variables: {
//           input: {
//             name: user.attributes['custom:companyName'],
//             address: user.attributes['custom:companyAddress'],
//             registrationNumber: user.attributes['custom:companyRegNum'],
//             contactDetails: {phone: null, email: null},
//             rating: {currentRating: null, numberOfRatings: null},
//             bankAccount: {accountNumber: null, bankName: null},
//           },
//         },
//       });
//       log('FarmCreated!');
//       companyID = response.data.createFarmerCompany.id;
//     } else if (type == 'supermarket') {
//       var response = await API.graphql({
//         query: createRetailerCompany,
//         variables: {
//           input: {
//             name: user.attributes['custom:companyName'],
//             address: user.attributes['custom:companyAddress'],
//             registrationNumber: user.attributes['custom:companyRegNum'],
//             contactDetails: {phone: null, email: null},
//             rating: {currentRating: null, numberOfRatings: null},
//             favouriteStores: [],
//             bankAccount: {accountNumber: null, bankName: null},
//           },
//         },
//       });
//       log(response);
//       log('Supermarket Created!');
//       companyID = response.data.createRetailerCompany.id;
//     } else if (type == 'supplier') {
//       var response = await API.graphql({
//         query: createSupplierCompany,
//         variables: {
//           input: {
//             name: user.attributes['custom:companyName'],
//             address: user.attributes['custom:companyAddress'],
//             registrationNumber: user.attributes['custom:companyRegNum'],
//             contactDetails: {phone: null, email: null},
//             rating: {currentRating: null, numberOfRatings: null},
//             favouriteStores: [],
//             bankAccount: {accountNumber: null, bankName: null},
//           },
//         },
//       });
//       log('Supplier Created!');
//       companyID = response.data.createSupplierCompany.id;
//     } else {
//       log('Nothing was Created', type);
//     }
//   } catch (err) {
//     log(err);
//   }
//   try {
//     var input = {
//       id: user.attributes.sub,
//       name: user.attributes.name,
//       role: user.attributes['custom:role'],
//       contactNumber: user.attributes.phone_number,
//       email: user.attributes.email,
//     };
//     if (type == 'farm') {
//       input['farmerCompanyID'] = companyID;
//     } else if (type == 'supermarket') {
//       input['retailerCompanyID'] = companyID;
//     } else if (type == 'supplier') {
//       input['supplierCompanyID'] = companyID;
//     }
//     const newUserInfo = await API.graphql({
//       query: createUser,
//       variables: {
//         input,
//       },
//     });
//     log('newuser: ' + newUserInfo.data.createUser);
//     return newUserInfo.data.createUser;
//   } catch (e) {
//     log(e);
//     return false;
//   }
// };

// export const getUserAttributes = async id => {
//   log('fetchinguserInfo', 'green');
//   try {
//     const userInfo = await API.graphql({
//       query: getUser,
//       variables: {id: id},
//     });
//     log('getuser' + id, 'magenta');

//     if (userInfo.data.getUser) {
//       log('loggingin');
//       return userInfo.data.getUser;
//     } else {
//       log('no user found', 'red');
//       log(userID + 'not found');
//       log(userAttributes);

//       log('attempting to create new user');
//       createNewUser().then(data => {
//         return data;
//       });
//     }
//   } catch (e) {
//     log(e);
//   }
// };
