import { takeLatest, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { RESET_PASSWORD } from 'actions/resetPassword';
import resetPasswordApi from 'api/resetPassword';

export function* doResetPassword(action) {
  const { resolve, reject } = action.meta;
  try {
    const { password, resetPasswordToken } = action.meta;

    yield call(resetPasswordApi, resetPasswordToken, password);

    yield call(resolve);
  } catch (error) {
    let errorMessage;
    switch (error.statusCode) {
      case 400:
        yield (errorMessage = { _error: 'Password reset token is invalid.' });
        break;
      default:
        yield (errorMessage = { _error: 'Something went wrong on our end.' });
    }

    yield call(reject, new SubmissionError(errorMessage));
  }
}

function* resetPasswordWatcher() {
  yield takeLatest(RESET_PASSWORD, doResetPassword);
}

export default resetPasswordWatcher;
