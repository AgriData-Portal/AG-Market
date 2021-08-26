import {Auth} from 'aws-amplify';

import {log} from '_utils';

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
