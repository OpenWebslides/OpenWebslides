import { takeLatest, put, call } from 'redux-saga/effects';

import {
  FETCH_USER_SUCCESS,
  FETCH_USER,
  FETCH_USER_FAILURE,
} from 'actions/entities/users';
import { SIGNOUT } from 'actions/signoutActions';

import fetchUser from 'api/fetchUserApi';

function userJsonToObject(responseUser) {
  return {
    id: responseUser.data.id,
    firstName: responseUser.data.attributes.firstName,
    lastName: responseUser.data.attributes.lastName,
  };
}

export function* fetchUserFlow(action) {
  try {
    const responseUser = yield call(
      fetchUser,
      action.meta.userId,
    );
    if (!responseUser) {
      throw new Error('Received undefined user.');
    }

    const userObject = userJsonToObject(responseUser);

    yield put({ type: FETCH_USER_SUCCESS, payload: userObject });
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put({
        type: FETCH_USER_FAILURE,
        payload: {
          message: 'You are not signed in!',
        },
      });
    }
    else {
      yield put({
        type: FETCH_USER_FAILURE,
        payload: {
          message: error.message,
        },
      });
    }
  }
}

function* fetchUserWatcher() {
  yield takeLatest(FETCH_USER, fetchUserFlow);
}

export default fetchUserWatcher;
