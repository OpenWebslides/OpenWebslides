import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import handleApiErrors from '../util/api_errors';
import { browserHistory } from 'react-router'

import {
  REQUEST_SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from './constants';

import {
  setClient,
  unsetClient,
} from '../client/actions';

import {
  UNSET_CLIENT,
} from '../client/constants';

function signinApi(email, password) {
  const signinUrl = '/auth/sign_in';

  return fetch(signinUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json.access_token)
    .catch((error) => { throw error; });
}

function* signout() {
  yield put(unsetClient());

  localStorage.removeItem('token');
  browserHistory.push('/signin');
}

function* signinFlow(email, password) {
  let token;
  try {
    token = yield call(signinApi, email, password);
    yield put(setClient(token));

    yield put({ type: SIGNIN_SUCCESS });

    localStorage.setItem('token', JSON.stringify(token));

    browserHistory.push('/');
  } catch (error) {
    yield put({ type: SIGNIN_ERROR, error });
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/');
    }
  }

  return token;
}

function* signinWatcher() {
  const { email, password } = yield take(REQUEST_SIGNIN);

  const task = yield fork(signinFlow, email, password);

  const action = yield take([UNSET_CLIENT, SIGNIN_ERROR]);

  if (action.type === UNSET_CLIENT) yield cancel(task);

  yield call(signout);
}

export default signinWatcher;
