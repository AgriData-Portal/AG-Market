import React from 'react';
import {Auth} from 'aws-amplify';

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log('Success');
    return user.attributes;
  } catch (error) {
    setError('signin');
    setModalVisible2(true);
    console.log('Error signing in...', error);
  }
};

export const sendVerification = async phone => {
  Auth.forgotPassword(phone)
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

export const changePassword = async (phone, code, password) => {
  Auth.forgotPasswordSubmit(phone, code, password)
    .then(data => {
      console.log(data);
      setModalVisible3(true);
    })
    .catch(err => {
      console.log(err);
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
    console.log(user.userSub);
  } catch (error) {
    console.log('❌ Error signing up...', error);
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
    updateAuthState('loggedOut');
    console.log('Logged Out');
  } catch (error) {
    console.log('Error signing out: ', error);
  }
};
