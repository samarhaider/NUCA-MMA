import { takeLatest, takeEvery } from "redux-saga/effects";
import API from "../Services/Api";
import * as CONSTANTS from '../Constants'

/* ------------- Sagas ------------- */

import { login } from "./LoginSagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

watcher
/* ------------- Connect Types To Sagas ------------- */

export default function* watcher() {
  yield [
    // some sagas only receive an action
    takeLatest(CONSTANTS.LOGIN_USER, login, api)
  ];
}
