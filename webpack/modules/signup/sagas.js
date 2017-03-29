import { call, put, takeLatest } from 'redux-saga/effects';

import handleApiErrors from '../util/api_errors';

import {
  REQUEST_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants';

function signupApi(email) {
  const signupUrl = '/api/users';
  const body = {
    data: {
      type: 'users',
      attributes: {
        email,
        name: 'boombie',
      },
    },
  };

  return fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
    body: JSON.stringify(body),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error; });
}

function* signupFlow(action) {
  try {
    const { email, password } = action;
    const response = yield call(signupApi, email, password);
    yield put({ type: SIGNUP_SUCCESS, response });
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error });
  }
}

function* signupWatcher() {
  yield takeLatest(REQUEST_SIGNUP, signupFlow);
}

export default signupWatcher;
