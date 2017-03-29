import SignupSaga from './modules/sign_up/sagas';


export default function* IndexSaga() {
  yield [
    SignupSaga(),
  ];
}
