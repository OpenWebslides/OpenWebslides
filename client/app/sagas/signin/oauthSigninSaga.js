import { takeLatest, call, put } from 'redux-saga/effects';

import { OAUTH_SIGNIN_USER, SIGNIN_USER_SUCCESS } from 'actions/signinActions';

import fetchUserApi from 'api/fetchUserApi';


function* doOauthSigninUser(action) {
  const { authToken, id } = action.meta;

  const user = yield call(fetchUserApi, id);

  const { firstName, lastName } = user.data.attributes;

  yield put({
    type: SIGNIN_USER_SUCCESS,
    payload: {
      authToken,
      firstName,
      lastName,
    },
  });
}

function* oauthSigninWatcher() {
  yield takeLatest(OAUTH_SIGNIN_USER, doOauthSigninUser);
}

export default oauthSigninWatcher;
