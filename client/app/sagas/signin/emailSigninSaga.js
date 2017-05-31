import { takeLatest, call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { EMAIL_SIGNIN_USER, SIGNIN_USER_SUCCESS } from 'actions/signinActions';
import emailSigninApi from 'api/emailSigninApi';

export function* doEmailSignin(action) {
  const { resolve, reject } = action.meta;

  try {
    const { email, password } = action.meta.values;
    const response = yield call(emailSigninApi, email, password);
    const { authToken, firstName, id } = response;

    if (typeof authToken === 'undefined') {
      throw new Error('Unable to find JWT in response');
    }

    yield put({
      type: SIGNIN_USER_SUCCESS,
      payload: {
        authToken,
        firstName,
        id,
      },
    });

    yield call(resolve);
  } catch (error) {
    let errorMessage;
    switch (error.statusCode) {
      case 401:
        yield (errorMessage = { _error: 'Password or email is incorrect.' });
        break;
      case 403:
        yield (errorMessage = {
          _error: 'Account had not yet been activated. Please check your email.',
        });
        break;
      default:
        yield (errorMessage = { _error: 'Something went wrong on our end.' });
    }

    yield call(reject, new SubmissionError(errorMessage));
  }
}

function* emailSigninWatcher() {
  yield takeLatest(EMAIL_SIGNIN_USER, doEmailSignin);
}

export default emailSigninWatcher;
