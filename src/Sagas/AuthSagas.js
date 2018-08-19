import { NavigationActions } from 'react-navigation';
import { call, put, select } from "redux-saga/effects";
import { AsyncStorage } from 'react-native';
import API from "../Services/Api";
// import registerForPushNotificationsAsync from "../Services/registerForPushNotificationsAsync";
import * as CONSTANTS from "../Constants";
import { showErrors, showErrorsAndReturnPayload } from '../Components/ValidationRules';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

// attempts to login
export function* loginUser(action) {
  const response = yield call(api.loginUser, action.payload);
  if (response.ok) {
    // const firstUser = path(['data', 'items'], response)[0]
    const payload = response.data;
      // do data conversion here if needed
      yield saveToken(payload);
      yield put({ type: CONSTANTS.LOGIN_USER_SUCCESS, payload });
      // const expoToken = yield registerForPushNotificationsAsync(payload.token);
      yield put(NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
              NavigationActions.navigate({ routeName: 'drawerStack' })
          ]
        })
      );
  } else {
    // const payload = showErrorsAndReturnPayload(response);
    const payload = response.data;
    alert(payload.message);
    yield put({ type: CONSTANTS.LOGIN_USER_FAIL, payload });
  }
}

async function saveToken(payload){
  await AsyncStorage.setItem(CONSTANTS.STORAGE_KEY, payload.access_token);
}

async function getData(){
  return await AsyncStorage.getItem(CONSTANTS.STORAGE_KEY);
}

export function* getDataFromStorage(action){
  const payload = null;
  if(payload) {
    yield put({ type: CONSTANTS.FETCH_DATA_FROM_STORAGE_SUCCESS, payload });
    yield put(NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
          NavigationActions.navigate({ routeName: 'drawerStack' })
      ]
    })
  );
  } else {
    yield put({ type: CONSTANTS.FETCH_DATA_FROM_STORAGE_FAIL });    
  }
}

const getAuth = state => state.auth;
export function* loginUserDetail(action) {
  const auth = yield select(getAuth);
  return auth;
}

// attempts to register
export function* registerUser(action) {
  const response = yield call(api.registerUser, action.payload);
  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.REGISTER_USER_SUCCESS, payload });
    yield put(NavigationActions.navigate({ routeName: 'phoneVerification' }));
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.REGISTER_USER_FAIL, payload });
 }
}

// send verification code
export function* sendVerificationCode(action) {
  const response = yield call(api.verifyUser, action.payload);
  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
      yield put({ type: CONSTANTS.SEND_VERIFICATION_CODE_SUCCESS, payload });
      yield put(NavigationActions.navigate({ routeName: 'login' }));
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.SEND_VERIFICATION_CODE_FAIL, payload });
  }
}
// resend verification code
export function* resendVerificationCode(action) {
  const response = yield call(api.resendVerificationCode, action.payload);
  if (response.ok) {
    const payload = response.data;
    showErrors("Verfication code has been resent.");
    // do data conversion here if needed
    yield put({ type: CONSTANTS.RESEND_VERIFICATION_CODE_SUCCESS, payload });
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.RESEND_VERIFICATION_CODE_FAIL, payload });
  }
}

// Send Password Reset Code
export function* sendPasswordResetCode(action) {
  
  const response = yield call(api.sendPasswordResetCode, action.payload);

  const payload = response.data;
  const {error, message} = payload;

  if (response.ok) {
    alert(message || error);
    // do data conversion here if needed
    yield put({ type: CONSTANTS.SEND_PASSWORD_RESET_CODE_SUCCESS, payload });
    yield put(NavigationActions.navigate({ routeName: 'login' }));
  } else {
    alert(message || error);
    // const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.SEND_PASSWORD_RESET_CODE_FAIL, payload });
  }
}
// Change Password
export function* changePassword(action) {
  const response = yield call(api.resetPassword, action.payload);
  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.CHANGE_PASSWORD_SUCCESS, payload });
    yield put(NavigationActions.navigate({ routeName: 'login' }));
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.CHANGE_PASSWORD_FAIL, payload });
  }
}

// logout
export function* logoutUser(action) {
  // const response = yield call(api.resetPassword, action.payload);
  // if (response.ok) {
  //   const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.LOGOUT_USER_SUCCESS });
    AsyncStorage.removeItem(CONSTANTS.STORAGE_KEY);
    yield put(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({ routeName: 'loginStack' })
        ]
      })
    );

  // } else {
  //  const payload = showErrorsAndReturnPayload(response);
  //   yield put({ type: CHANGE_PASSWORD_FAIL, payload });
  // }
}