import {API, Auth} from 'aws-amplify';
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
