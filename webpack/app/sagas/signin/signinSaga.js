import { takeLatest, call, put } from 'redux-saga/effects';

import { types } from 'actions/signinActions';
import signinApiCall from './signinApiCall';

export function* signinFlow(action) {
  try {
    const { email, password } = action.meta;
    const responseBody = yield call(signinApiCall, email, password);

    if (typeof responseBody.jwt === 'undefined') {
      throw new Error('Unable to find JWT in response body');
    }

    const authToken = responseBody.jwt;

    yield put({
      type: types.SIGNIN_SUCCESS,
      payload: {
        authToken,
      },
    });
  } catch (error) {
    yield put({
      type: types.SIGNIN_ERROR,
      payload: {
        message: error.message,
        statusCode: error.statusCode,
      },
    });
  }
}

function* signinWatcher() {
  yield takeLatest(types.REQUEST_SIGNIN, signinFlow);
}

export default signinWatcher;
