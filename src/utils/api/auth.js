import React from 'react';
import {Auth} from 'aws-amplify';
import {log} from '_utils';

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    log('Success');
    return user.attributes;
  } catch (error) {
    setError('signin');
    setModalVisible2(true);
    log('Error signing in...', error);
  }
};

export const sendVerification = async phone => {
  Auth.forgotPassword(phone)
    .then(data => log(data))
    .catch(err => log(err));
};

export const changePassword = async (phone, code, password) => {
  Auth.forgotPasswordSubmit(phone, code, password)
    .then(data => {
      log(data);
      setModalVisible3(true);
    })
    .catch(err => {
      log(err);
      setError('verify');
      setModalVisible4(true);
    });
};

export const signUp = async (email, phone, password) => {
  try {
    const user = await Auth.signUp({
      username: phone,
      password,
      attributes: {
        email,
        phone_number: phone,
      },
    });
    setSuccessModalVisible(true);
    log(user.userSub);
  } catch (error) {
    log('❌ Error signing up...', error);
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
    updateAuthState('loggedOut');
    log('Logged Out');
  } catch (error) {
    log('Error signing out: ', error);
  }
};
