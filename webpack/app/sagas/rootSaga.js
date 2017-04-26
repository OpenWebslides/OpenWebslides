import SigninSaga from 'sagas/signinSaga';
import SignupSaga from 'sagas/signupSaga';
import emailAvailableSaga from 'sagas/serverValidation/emailAvailableSaga';

export default function* rootSaga() {
  yield [
    SigninSaga(),
    SignupSaga(),
    emailAvailableSaga(),
  ];
}
