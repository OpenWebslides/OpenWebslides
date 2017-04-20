import { takeLatest, call, put } from 'redux-saga/effects';

import { types } from 'actions/signupActions';
import signupApiCall from './signupApiCall';

function* signupFlow(action) {
  const { email, password } = action.meta;

  const responseBody = yield call(signupApiCall, email, password);

  yield put(signupApiCall, responseBody);
}

function* signupWatcher() {
  yield takeLatest(types.REQUEST_SIGNUP, signupFlow);
}

export default signupWatcher;
