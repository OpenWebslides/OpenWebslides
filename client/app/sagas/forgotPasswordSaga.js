import { takeLatest, call } from 'redux-saga/effects';

import { FORGOT_PASSWORD } from 'actions/forgotPasswordActions';
import forgotPassword from 'api/forgotPasswordApi';

function* doForgotPassword(action) {
  const { email, resolve } = action.meta;

  yield call(forgotPassword, email);

  resolve();
}

function* forgotPasswordWatcher() {
  yield takeLatest(FORGOT_PASSWORD, doForgotPassword);
}

export default forgotPasswordWatcher;
