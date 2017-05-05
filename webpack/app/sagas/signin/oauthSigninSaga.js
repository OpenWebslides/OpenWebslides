import { takeLatest, put } from 'redux-saga/effects';

import {
  OAUTH_SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
} from 'actions/signinActions';

function* doOAuthSigninUser(action) {
  const { authToken } = action.meta;
  yield put({
    type: SIGNIN_USER_SUCCESS,
    payload: {
      authToken,
    },
  });
}

function* oAuthSigninWatcher() {
  yield takeLatest(
    OAUTH_SIGNIN_USER,
    doOAuthSigninUser,
  );
}

export default oAuthSigninWatcher;
