import { takeLatest, put } from 'redux-saga/effects';

import { OAUTH_SIGNIN_USER, SIGNIN_USER_SUCCESS } from 'actions/signinActions';

function* doOauthSigninUser(action) {
  const { authToken, id } = action.meta;
  yield put({
    type: SIGNIN_USER_SUCCESS,
    payload: {
      id,
      authToken,
    },
  });
}

function* oauthSigninWatcher() {
  yield takeLatest(OAUTH_SIGNIN_USER, doOauthSigninUser);
}

export default oauthSigninWatcher;
