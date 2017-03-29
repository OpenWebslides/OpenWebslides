import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';

import { browserHistory } from 'react-router';

import { handleApiErrors } from '../util/api_errors';

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
  CLIENT_UNSET,
} from '../client/constants';

function signinApi(email, password) {
  const signinUrl = '/auth/signin';

  return fetch(signinUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
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
      browserHistory.push('/signin');
    }
  }

  return token;
}

function* signinWatcher() {
  const { email, password } = yield take(REQUEST_SIGNIN);

  const task = yield fork(signinFlow, email, password);

  const action = yield take([CLIENT_UNSET, SIGNIN_ERROR]);

  if (action.type === CLIENT_UNSET) yield cancel(task);

  yield call(signout);
}

export default signinWatcher;
