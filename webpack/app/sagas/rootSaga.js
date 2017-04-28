import signinSaga from 'sagas/signinSaga';
import signupSaga from 'sagas/signupSaga';
import confirmEmailSaga from 'sagas/confirmEmailSaga';
import resetPasswordSaga from 'sagas/resetPasswordSaga';
import emailAvailableSaga from 'sagas/serverValidation/emailAvailableSaga';

export default function* rootSaga() {
  yield [
    signinSaga(),
    signupSaga(),
    confirmEmailSaga(),
    emailAvailableSaga(),
    resetPasswordSaga(),
  ];
}
