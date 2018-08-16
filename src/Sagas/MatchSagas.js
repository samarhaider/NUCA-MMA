import { NavigationActions } from 'react-navigation';
import { call, put } from 'redux-saga/effects';
import API from '../Services/Api';
import * as CONSTANTS from '../Constants';
import { showErrorsAndReturnPayload } from '../Components/ValidationRules';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

export function* postList(action) {
   const response = yield call(api.getPostsList, action.payload);

  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.POST_LIST_FETCH_SUCCESS, payload });
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.POST_LIST_FETCH_FAIL, payload });
  }
}

export function* postDetail(action) {
  const response = yield call(api.getPostDetail, action.payload);

 if (response.ok) {
   const payload = response.data;
   // do data conversion here if needed
   yield put({ type: CONSTANTS.POST_DETAIL_SUCCESS, payload });
 } else {
   const payload = showErrorsAndReturnPayload(response);
   yield put({ type: CONSTANTS.POST_DETAIL_FAIL, payload });
 }
}

export function* postSave(action) {
   const response = yield call(api.savePost, action.payload);
  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.POST_SAVE_SUCCESS, payload });
    // yield put(NavigationActions.navigate({ routeName: 'fovorAddedByMe' }));
    yield put(NavigationActions.navigate({ routeName: 'home' }));
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.POST_SAVE_FAIL, payload });
  }
}

export function* postUpdate(action) {
   const response = yield call(api.updatePost, action.payload);

  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.POST_UPDATE_SUCCESS, payload });
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.POST_UPDATE_FAIL, payload });
  }
}

export function* inProgressLoad(action) {
  const response = yield call(api.inProgressLoad, action.payload);

 if (response.ok) {
   const payload = response.data;
   // do data conversion here if needed
   yield put({ type: CONSTANTS.IN_PROGRESS_LOAD_FETCH_SUCCESS, payload });
 } else {
   const payload = showErrorsAndReturnPayload(response);
   yield put({ type: CONSTANTS.IN_PROGRESS_LOAD_FETCH_FAIL, payload });
 }
}

export function* trackingLocationSave(action) {
  const response = yield call(api.trackingLocationLoadSave, action.payload);

 if (response.ok) {
   const payload = response.data;
   // do data conversion here if needed
   yield put({ type: CONSTANTS.TRACKING_LOCATION_SAVE_SUCCESS, payload });
 } else {
   const payload = showErrorsAndReturnPayload(response);
   yield put({ type: CONSTANTS.TRACKING_LOCATION_SAVE_FAIL, payload });
 }
}

