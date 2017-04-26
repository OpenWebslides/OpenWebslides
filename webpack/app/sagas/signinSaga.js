import { takeLatest, call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import {
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
} from 'actions/signinActions';

import signinApiCall from 'api/signinApi';

export function* signinFlow(action) {
  const { resolve, reject } = action.meta;
  try {
    const { email, password } = action.meta.values;

    const responseBody = yield call(signinApiCall, email, password);

    if (typeof responseBody.jwt === 'undefined') {
      throw new Error('Unable to find JWT in response body');
    }

    const authToken = responseBody.jwt;

    yield put({
      type: SIGNIN_USER_SUCCESS,
      payload: {
        authToken,
      },
    });

    yield call(resolve);
  } catch (error) {
    yield call(
      reject,
      new SubmissionError({ _error: 'Credentials are invalid' }));
  }
}

function* signinWatcher() {
  yield takeLatest(SIGNIN_USER, signinFlow);
}

export default signinWatcher;
