import { takeLatest, call, put } from 'redux-saga/effects';

import confirmEmailApi from 'api/confirmEmail';
import {
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
} from 'actions/confirmEmail';

export function* doConfirmEmail(action) {
  try {
    const { confirmationToken } = action.meta;

    yield call(confirmEmailApi, confirmationToken);

    yield put({ type: CONFIRM_EMAIL_SUCCESS });
  } catch (error) {
    yield put({ type: CONFIRM_EMAIL_FAILURE });
  }
}

function* confirmEmailWatcher() {
  yield takeLatest(CONFIRM_EMAIL, doConfirmEmail);
}

export default confirmEmailWatcher;
