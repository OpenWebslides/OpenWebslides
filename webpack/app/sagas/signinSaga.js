import { takeLatest, call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import {
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
} from 'actions/signinActions';

import signinApi from 'api/signinApi';

export function* doSignin(action) {
  const { resolve, reject } = action.meta;

  try {
    const { email, password } = action.meta.values;
    const { authToken, firstName } = yield call(signinApi, email, password);

    if (typeof authToken === 'undefined') {
      throw new Error('Unable to find JWT in response');
    }

    yield put({
      type: SIGNIN_USER_SUCCESS,
      payload: {
        authToken,
        firstName,
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
  yield takeLatest(SIGNIN_USER, doSignin);
}

export default signinWatcher;
