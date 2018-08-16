// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import { AsyncStorage } from "react-native";
import * as CONSTANTS from "../../src/Constants";
import { store } from '../../App';

// our "constructor"
  const create = (baseURL = `${CONSTANTS.API_BASE_URL}/`) => {
    let token;
      // ------
    // STEP 1
    // ------
    //
    // Create and configure an apisauce-based api object.
    //
    const api = apisauce.create({ // base URL is read from the "constructor"
      baseURL, headers: {} }); // here are some default headers // 10 second timeout...

    // Wrap api's addMonitor to allow the calling code to attach
    // additional monitors in the future.  But only in __DEV__ and only
    // if we've attached Reactotron to console (it isn't during unit tests).
    // if (__DEV__ && console.tron) {
    //   api.addMonitor(console.tron.apisauce)
    // }
    // api.addResponseTransform(response => {
    //   console.tron.log('errror')
    //   console.tron.log(response)
    // });
    // ------
    // STEP 2
    // ------
    //
    // Define some functions that call the api.  The goal is to provide
    // a thin wrapper of the api layer providing nicer feeling functions
    // rather than "get", "post" and friends.
    //
    // I generally don't like wrapping the output at this level because
    // sometimes specific actions need to be take on `403` or `401`, etc.
    //
    // Since we can't hide from that, we embrace it by getting out of the
    // way at this level.
    //
    async function getToken() {
      token = await AsyncStorage.getItem(CONSTANTS.STORAGE_KEY);
      return token;
    }

    // async function getHeaders() {
    //   return {};
    //   const token = await AsyncStorage.getItem(CONSTANTS.STORAGE_KEY);
    //   const ret = token ? { Authorization: `Bearer ${token}` } : {};
    //   return ret;
    // };
    // api.defaults.headers.common['Authorization'] = 'AUTH_TOKEN' // need the token here

    getToken().then(token => {
      api.setHeader('Authorization', `Bearer ${token}` )
      // save in redux 
    });

    const setToken = (token) => {
      token = token      
    };
    const loginUser = (data = {}) => api.post("users/login", {User: data});
    const registerUser = (data = {}) => api.post("users/register", data);
    const verifyUser = (data = {}) => api.post("users/verify", data);
    const resendVerificationCode = (data = {}) => api.post("users/resend-code", data);
    const sendPasswordResetCode = (data = {}) => api.post("users/send-password-reset-code", data);
    const resetPassword = (data = {}) => api.post("users/reset-password", data);
    // Posts
    const getPostsList = (QueryString = {}) => {
      return getToken().then(token => {
        api.setHeader('Authorization', `Bearer ${token}` )
        return api.get("operators/viewLoadPosts.json", QueryString)
      })
    };
    const getPostDetail = (QueryString = {}) => api.get(`favors/${QueryString.id}`, QueryString);
    const savePost = (data = {}) => {
      // let form_data = new FormData();
      // for ( var key in data ) {
      //     form_data.append(key, data[key]);
      // }
      // if(data.image) {
      //   form_data.append('image', {
      //     uri: data.image,
      //     type: 'image/jpeg',
      //     name: 'testPhotoName'
      //   });
      // }
      // const headers = {
      //   'content-type': 'multipart/form-data',
      // }
      return api.post(`favors`, data, {headers})
    };
    const updatePost = (data = {}) => api.put(`favors/${data.id}`, data, {
        // headers: getHeaders()
      });
    const inProgressLoad = (QueryString = {}) => {
      return getToken().then(token => {
        api.setHeader('Authorization', `Bearer ${token}` )
        return api.get("users/inProgressLoad.json", QueryString)
      })
    };
    const trackingLocationLoadSave = (data = {}) => api.post(`operators/updateTracking.json`, data);
    const getShipmentsList = (QueryString = {}) => {
      return getToken().then(token => {
        api.setHeader('Authorization', `Bearer ${token}` )
        return api.get("users/checkYourShipment.json", QueryString)
      })
    };
    const getShipmentDetail = (QueryString = {}) => api.get(`users/MacroDetails/${QueryString.id}.json`, QueryString);
      // Profile
    const getUserProfile = (QueryString = {}) => api.get(`users/${QueryString.id}`, QueryString);
    const updateAvatar = (data = {}) => {
      let form_data = new FormData();
      if(data) {
        form_data.append('avatar', {
          uri: data,
          type: 'image/jpeg',
          name: 'testPhotoName'
        });
      }
      const headers = {
        'content-type': 'multipart/form-data',
      }
      // api.post(`user/avatar`, data);
      return api.post(`users/avatar`, form_data, {headers})};
    const updateProfile = (data = {}) => api.post(`user/me`, data);

    // ------
    // STEP 3
    // ------
    //
    // Return back a collection of functions that we would consider our
    // interface.  Most of the time it'll be just the list of all the
    // methods in step 2.
    //
    // Notice we're not returning back the `api` created in step 1?  That's
    // because it is scoped privately.  This is one way to create truly
    // private scoped goodies in JavaScript.
    //
    return { // a list of the API functions from step 2
      setToken, loginUser, registerUser, verifyUser, resendVerificationCode, sendPasswordResetCode, 
      resetPassword, getPostsList, updatePost, getUserProfile, updateProfile, updateAvatar, getPostDetail, savePost,
      inProgressLoad, trackingLocationLoadSave,
      getShipmentsList, getShipmentDetail };
  };
// let's return back our create method as the default.
export default {
  create
};