import { put, call } from 'redux-saga/effects';

import { FETCH_USER_SUCCESS } from 'actions/entities/users';

import fetchUser from 'api/fetchUserApi';

function userJsonToObject(responseUser) {
  return {
    id: responseUser.data.id,
    firstName: responseUser.data.attributes.firstName,
    lastName: responseUser.data.attributes.lastName,
  };
}

export function* fetchUserFlow(userId) {
  const responseUser = yield call(
      fetchUser,
      userId,
    );
  if (responseUser.errors) {
    throw new Error(responseUser.errors[0].title);
  }
  const userObject = userJsonToObject(responseUser);

  yield put({ type: FETCH_USER_SUCCESS, payload: userObject });
}


