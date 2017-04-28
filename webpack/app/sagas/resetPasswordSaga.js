import { takeLatest, call } from 'redux-saga/effects';

import { RESET_PASSWORD } from 'actions/resetPasswordActions';
import resetPasswordApi from 'api/resetPasswordApi';

function* doResetPassword(action) {
  const { email, resolve } = action.meta;

  yield call(resetPasswordApi, email);

  resolve();
}

function* resetPasswordWatcher() {
  yield takeLatest(RESET_PASSWORD, doResetPassword);
}

export default resetPasswordWatcher;
