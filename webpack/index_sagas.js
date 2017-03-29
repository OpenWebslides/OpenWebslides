import SignupSaga from './modules/signup/sagas';


export default function* IndexSaga() {
  yield [
    SignupSaga(),
  ];
}
