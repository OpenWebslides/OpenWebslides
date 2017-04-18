import SigninSaga from './modules/signin/sagas'

export default function * rootSaga () {
  yield [SigninSaga()]
}
