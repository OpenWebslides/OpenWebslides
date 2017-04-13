import { takeLatest, call, put, take, race } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';


import {
  REQUEST_SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_REQUEST,
} from './constants';

import signinApiCall from './api';

export function* signin(data) {
  let response;
  try {
    const { email, password } = data;
    response = yield call(signinApiCall, email, password);
    return response;
  } catch (error) {
    yield put({
      type: SIGNIN_ERROR,
      payload: { error },
    });
  }
  return response;
}

export function* signinFlow(action) {
  const outcome = yield race({
    signedIn: call(signin, action.meta),
    signedOut: take(SIGNOUT_REQUEST),
  });

  if (outcome.signedIn) {
    const accessToken = outcome.signedIn.access_token;
    const decodedUserData = jwtDecode(accessToken);
    yield put({
      type: SIGNIN_SUCCESS,
      payload: {
        accessToken,
        id: decodedUserData.id || 1,
      },
    });
  }
}

function* signinWatcher() {
  yield takeLatest(REQUEST_SIGNIN, signinFlow);
}

export default signinWatcher;
