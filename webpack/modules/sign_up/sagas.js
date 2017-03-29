import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


import {
  REQUEST_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants';

const signupUrl = '/api/auth/sign_up';

function signupApi(email, password) {
  return axios.get(signupUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => console.log(response))
    .catch((error) => { throw error; });
}

function* signupFlow(action) {
  try {
    const { email, password } = action;

    const response = yield call(signupApi, email, password)

    yield put({ type: SIGNUP_SUCCESS, response })
  } catch (error) {

    yield put({ type: SIGNUP_ERROR, error })
  }
}

function* signupWatcher() {
  console.log('WATCHING');

  yield takeLatest(REQUEST_SIGNUP, signupFlow);
}

export default signupWatcher;
