import { takeLatest, call } from 'redux-saga/effects';

import { REQUEST_RESET_PASSWORD } from 'actions/resetPasswordActions';

import requestResetPassword from 'api/resetPassword/requestResetPassword';

function* doResetPassword(action) {
  const { email, resolve } = action.meta;

  yield call(requestResetPassword, email);

  resolve();
}

function* requestResetPasswordWatcher() {
  yield takeLatest(REQUEST_RESET_PASSWORD, doResetPassword);
}

export default requestResetPasswordWatcher;
