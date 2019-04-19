import {
  takeLatest,
  all,
  put,
  call
} from "redux-saga/effects";

import sagasManager from "Utils/sagasManager";
import {
  LOGIN_USER,
  getLoginUserSuccess,
  getLoginUserError,
  sentToRegisterPage
} from "Actions/login";
import {
  LOGIN_API_URL,
  HTTP_STATUS_FOR_SUCCESS,
  LOGIN_RESPONSE_STATUS_FOR_SUCCESS,
  LOGIN_RESPONSE_STATUS_FOR_WRONG_PASS,
  LOGIN_RESPONSE_STATUS_FOR_WRONG_ID
} from 'Constants/commonConstants';
import {
  postCall
} from "Constants/api";

export function* loginUser(action) {
  console.log('loginUser', action)
  const data = yield call(postCall, LOGIN_API_URL, action.data)
  const {
    response,
    httpStatus
  } = data || {}
  const {
    message,
    loginResponseStatus
  } = response || {}
  if (httpStatus === HTTP_STATUS_FOR_SUCCESS) {
    if (loginResponseStatus === LOGIN_RESPONSE_STATUS_FOR_SUCCESS) {
      yield put(getLoginUserSuccess(response))
    } else if (loginResponseStatus === LOGIN_RESPONSE_STATUS_FOR_WRONG_PASS) {
      yield put(getLoginUserError(response))
    } else if (loginResponseStatus === LOGIN_RESPONSE_STATUS_FOR_WRONG_ID) {
      yield put(sentToRegisterPage(response))
    }
  } else {
    console.log("failed")
  }
}

sagasManager.addSagaToRoot(function* userWatcher() {
  yield all([
    takeLatest(LOGIN_USER, loginUser),
  ]);
});