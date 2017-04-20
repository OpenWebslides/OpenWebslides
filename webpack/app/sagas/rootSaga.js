import SigninSaga from 'sagas/signin/signinSaga';
import SignupSaga from 'sagas/signup/signupSaga';

export default function* rootSaga() {
  yield [
    SigninSaga(),
    SignupSaga(),
  ];
}
