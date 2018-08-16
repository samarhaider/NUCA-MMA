import { NavigationActions } from 'react-navigation';
import { call, put } from 'redux-saga/effects';
import API from '../Services/Api';
import * as CONSTANTS from '../Constants';
import { showErrorsAndReturnPayload } from '../Components/ValidationRules';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

// attempts to login
export function* getProfile(action) {
  const response = yield call(api.getUserProfile, action.payload);
  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.PROFILE_FETCH_SUCCESS, payload });
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.PROFILE_FETCH_FAIL, payload });
  }
}

export function* updateProfile(action) {
   const response = yield call(api.getUserProfile);

  if (response.ok) {
    const payload = response.data.body;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.PROFILE_FETCH_SUCCESS, payload });
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.PROFILE_FETCH_FAIL, payload });
    // yield put(NavigationActions.navigate({ type:'Navigate/BACK', routeName:null }));
    // NavigationActions.back()
    yield put(NavigationActions.navigate({ type:'Navigate/BACK' }));
  }
}

export function* updateAvatar(action) {
  const response = yield call(api.updateAvatar, action.payload);
 if (response.ok) {
   const payload = response.data;
   // do data conversion here if needed
   yield put({ type: CONSTANTS.PROFILE_AVATAR_UPDATE_SUCCESS, payload });
   // yield put(NavigationActions.navigate({ routeName: 'fovorAddedByMe' }));
  //  yield put(NavigationActions.navigate({ routeName: 'home' }));
 } else {
   const payload = showErrorsAndReturnPayload(response);
   yield put({ type: CONSTANTS.PROFILE_AVATAR_UPDATE_FAIL, payload });
 }
}
