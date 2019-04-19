import {
  takeLatest,
  all,
  put,
  call
} from "redux-saga/effects";

import sagasManager from "Utils/sagasManager";
import {
  LOGIN_USER,
  getLoginUserSuccess
} from "Actions/login";
import {
  LOGIN_API_URL
} from 'Constants/commonConstants';
import {
  postCall
} from "Constants/api";

export function* loginAdmin(action) {
  console.log('loginAdmin', action)
  const data = yield call(postCall, LOGIN_API_URL, action.data, 'application/json; charset=utf-8')
  if (data) {
    console.log('data recieved', data)
    yield put(getLoginUserSuccess(data))
  }

}

sagasManager.addSagaToRoot(function* visaWatcher() {
  yield all([
    takeLatest(LOGIN_USER, loginAdmin),
  ]);
});