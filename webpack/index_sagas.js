import SignupSaga from './modules/signup/sagas';
import SigninSaga from './modules/signin/sagas';


export default function* IndexSaga() {
  yield [
    SignupSaga(),
    SigninSaga(),
  ];
}
