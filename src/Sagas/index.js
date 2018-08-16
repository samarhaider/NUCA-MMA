import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import * as CONSTANTS from '../Constants';

/* ------------- Sagas ------------- */

import {
  getDataFromStorage,
  loginUser,
  logoutUser,
  sendVerificationCode,
} from "./AuthSagas";
import { postList, postDetail, postSave, postUpdate} from "./MatchSagas";

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([
    takeLatest(CONSTANTS.FETCH_DATA_FROM_STORAGE, getDataFromStorage),
    // Auth
    takeLatest(CONSTANTS.LOGIN_USER, loginUser),
    takeLatest(CONSTANTS.LOGOUT_USER, logoutUser),
    takeLatest(CONSTANTS.SEND_VERIFICATION_CODE, sendVerificationCode),
    // Post
    takeEvery(CONSTANTS.MATCH_LIST_FETCH, postList),
    takeLatest(CONSTANTS.MATCH_DETAIL, postDetail),
    takeLatest(CONSTANTS.MATCH_SAVE, postSave),
    takeLatest(CONSTANTS.MATCH_UPDATE, postUpdate),
  ]);
}
