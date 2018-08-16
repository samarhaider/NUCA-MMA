import { NavigationActions } from 'react-navigation';
import { call, put } from 'redux-saga/effects';
import API from '../Services/Api';
import * as CONSTANTS from '../Constants';
import { showErrorsAndReturnPayload } from '../Components/ValidationRules';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

export function* shipmentList(action) {
   const response = yield call(api.getShipmentsList, action.payload);

  if (response.ok) {
    const payload = response.data;
    // do data conversion here if needed
    yield put({ type: CONSTANTS.SHIPMENT_LIST_FETCH_SUCCESS, payload });
  } else {
    const payload = showErrorsAndReturnPayload(response);
    yield put({ type: CONSTANTS.SHIPMENT_LIST_FETCH_FAIL, payload });
  }
}

export function* shipmentDetail(action) {
  const response = yield call(api.getShipmentDetail, action.payload);

 if (response.ok) {
   const payload = response.data;
   // do data conversion here if needed
   yield put({ type: CONSTANTS.SHIPMENT_DETAIL_SUCCESS, payload });
 } else {
   const payload = showErrorsAndReturnPayload(response);
   yield put({ type: CONSTANTS.SHIPMENT_DETAIL_FAIL, payload });
 }
}

