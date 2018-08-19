import { NavigationActions } from 'react-navigation';
import { call, put } from 'redux-saga/effects';
import API from '../Services/Api';
import * as CONSTANTS from '../Constants';
import { showErrorsAndReturnPayload } from '../Components/ValidationRules';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

export function* matchList(action) {
   const response = yield call(api.getMatchesList, action.payload);

  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.MATCH_LIST_FETCH_SUCCESS, payload });
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.MATCH_LIST_FETCH_FAIL, payload });
  }
}

export function* matchDetail(action) {
  const response = yield call(api.getPostDetail, action.payload);

 if (response.ok) {
   const payload = response.data;
   // do data conversion here if needed
   yield put({ type: CONSTANTS.MATCH_DETAIL_SUCCESS, payload });
 } else {
   const payload = showErrorsAndReturnPayload(response);
   yield put({ type: CONSTANTS.MATCH_DETAIL_FAIL, payload });
 }
}

export function* matchSave(action) {
   const response = yield call(api.saveMatch, action.payload);
  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.MATCH_SAVE_SUCCESS, payload });
    yield put(NavigationActions.navigate({ routeName: 'home' }));
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.MATCH_SAVE_FAIL, payload });
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



