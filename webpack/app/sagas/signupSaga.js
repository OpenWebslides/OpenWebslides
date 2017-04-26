import { takeLatest, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import {
  SIGNUP_USER,
} from 'actions/signupActions';

import signupApiCall from 'api/signupApi';

function* signupFlow(action) {
  const { resolve, reject } = action.meta;

  try {
    const { email, password } = action.meta.values;

    yield call(signupApiCall, email, password);

    resolve('Succeeded');
  } catch (error) {
    yield call(
      reject,
      new SubmissionError({ _error: 'Something went wrong' }));
  }
}

function* signupWatcher() {
  yield takeLatest(SIGNUP_USER, signupFlow);
}

export default signupWatcher;
