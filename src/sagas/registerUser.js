import {
  takeLatest,
  all,
  put,
  call
} from "redux-saga/effects";

import sagasManager from "Utils/sagasManager";
import {
  ADD_NEW_USER,
  getRegisterUserSuccess,
  getRegisterUserError
} from "Actions/register";
import {
  REGISTER_API_URL,
  REGISTER_RESPONSE_STATUS_FOR_SUCCESS,
  REGISTER_RESPONSE_STATUS_EXISTING_ID,
  HTTP_STATUS_FOR_SUCCESS
} from 'Constants/commonConstants';
import {
  postCall
} from "Constants/api";

export function* registerUser(action) {
  console.log('registerUser', action)
  const {
    userData,
    onRegisterFailed
  } = action.data
  const data = yield call(postCall, REGISTER_API_URL, userData)
  const {
    httpStatus,
    msg,
    loginResponseStatus
  } = data || {}
  if (httpStatus === HTTP_STATUS_FOR_SUCCESS) {
    if (loginResponseStatus === REGISTER_RESPONSE_STATUS_FOR_SUCCESS) {
      yield put(getRegisterUserSuccess(data.userData))
    } else if (loginResponseStatus === REGISTER_RESPONSE_STATUS_EXISTING_ID) {
      yield put(getRegisterUserError(data))
      onRegisterFailed(data)
    }
  } else {
    console.log("failed")
  }

}

sagasManager.addSagaToRoot(function* userWatcher() {
  yield all([
    takeLatest(ADD_NEW_USER, registerUser),
  ]);
});