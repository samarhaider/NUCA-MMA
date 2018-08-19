import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import * as CONSTANTS from '../Constants';

/* ------------- Sagas ------------- */

import {
  getDataFromStorage,
  loginUser,
  logoutUser,
  sendPasswordResetCode,
} from "./AuthSagas";
import { matchList, matchDetail, matchSave } from "./MatchSagas";

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([
    takeLatest(CONSTANTS.FETCH_DATA_FROM_STORAGE, getDataFromStorage),
    // Auth
    takeLatest(CONSTANTS.LOGIN_USER, loginUser),
    takeLatest(CONSTANTS.LOGOUT_USER, logoutUser),
    takeLatest(CONSTANTS.SEND_PASSWORD_RESET_CODE, sendPasswordResetCode),
    // Match
    takeEvery(CONSTANTS.MATCH_LIST_FETCH, matchList),
    takeLatest(CONSTANTS.MATCH_DETAIL, matchDetail),
    takeLatest(CONSTANTS.MATCH_SAVE, matchSave),
    // takeLatest(CONSTANTS.MATCH_UPDATE, postUpdate),
  ]);
}
