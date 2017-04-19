import { takeLatest, call, put } from 'redux-saga/effects';

import {
  REQUEST_SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from './constants';

import signinApiCall from './api';

export function* signinFlow(action) {
  try {
    const { email, password } = action.meta;
    const responseBody = yield call(signinApiCall, email, password);

    if (typeof responseBody.jwt === 'undefined') {
      throw new Error('Unable to find JWT in response body');
    }

    const accessToken = responseBody.jwt;

    yield put({
      type: SIGNIN_SUCCESS,
      payload: {
        accessToken,
      },
    });
  } catch (error) {
    yield put({
      type: SIGNIN_ERROR,
      payload: {
        message: error.message,
        statusCode: error.statusCode,
      },
    });
  }
}

function* signinWatcher() {
  yield takeLatest(REQUEST_SIGNIN, signinFlow);
}

export default signinWatcher;
