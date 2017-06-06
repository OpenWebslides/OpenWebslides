import { takeLatest, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { SIGNUP_USER } from 'actions/signupActions';
import signupApi from 'api/signupApi';

export function* doSignup(action) {
  const { resolve, reject } = action.meta;

  try {
    const { email, password, firstName, lastName } = action.meta.values;

    yield call(signupApi, email, password, firstName, lastName);

    yield call(resolve);
  } catch (error) {
    let errorMessage;

    switch (error.statusCode) {
      case 422:
        yield (errorMessage = error.validationErrors);
        break;
      default:
        yield (errorMessage = { _error: 'Something went wrong on our end.' });
    }

    yield call(reject, new SubmissionError(errorMessage));
  }
}

function* signupWatcher() {
  yield takeLatest(SIGNUP_USER, doSignup);
}

export default signupWatcher;
