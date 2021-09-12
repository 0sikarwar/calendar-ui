import {
  takeLatest,
  all,
  put,
  call
} from "redux-saga/effects";

import sagasManager from "../utils/sagasManager";
import {
  LOGIN_USER,
  getLoginUserSuccess,
  getLoginUserError,
  sentToRegisterPage
} from "../actions/login";
import {
  LOGIN_API_URL,
  HTTP_STATUS_FOR_SUCCESS,
  LOGIN_RESPONSE_STATUS_FOR_SUCCESS,
  LOGIN_RESPONSE_STATUS_FOR_WRONG_PASS,
  LOGIN_RESPONSE_STATUS_FOR_WRONG_ID
} from '../constants/commonConstants';
import {
  postCall
} from "../constants/api";

export function* loginUser(action) {
  try {
    console.log('loginUser', action)
    const {
      userData,
      onLoginFailed
    } = action.data
    const data = yield call(postCall, LOGIN_API_URL, userData)
    const {
      httpStatus,
      message,
      loginResponseStatus
    } = data || {}
    console.log(data)
    if (httpStatus === HTTP_STATUS_FOR_SUCCESS) {
      if (loginResponseStatus === LOGIN_RESPONSE_STATUS_FOR_SUCCESS) {
        yield put(getLoginUserSuccess(data.userData))
      } else if (loginResponseStatus === LOGIN_RESPONSE_STATUS_FOR_WRONG_PASS) {
        yield put(getLoginUserError(data.userData))
        onLoginFailed(data.userData);
      } else if (loginResponseStatus === LOGIN_RESPONSE_STATUS_FOR_WRONG_ID) {
        yield put(sentToRegisterPage(data.userData))
        onLoginFailed(data.userData);
      }
    } else {
      console.log("failed")
    }
  } catch (e) {

  }

}

sagasManager.addSagaToRoot(function* userWatcher() {
  yield all([
    takeLatest(LOGIN_USER, loginUser),
  ]);
});