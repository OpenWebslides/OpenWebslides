import { takeLatest, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import {
  SIGNUP_USER,
} from 'actions/signupActions';

import signupApiCall from 'api/signupApi';

export function* doSignup(action) {
  const { resolve, reject } = action.meta;

  try {
    const { email, password, firstName, lastName } = action.meta.values;

    yield call(signupApiCall, email, password, firstName, lastName);

    yield call(resolve);
  } catch (error) {
    yield call(
      reject,
      new SubmissionError({ _error: 'Something went wrong' }));
  }
}

function* signupWatcher() {
  yield takeLatest(SIGNUP_USER, doSignup);
}

export default signupWatcher;
