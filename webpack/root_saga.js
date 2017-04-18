import SigninSaga from './modules/signin/saga'
import SignupSaga from './modules/signup/saga'

export default function * rootSaga () {
  yield [
    SigninSaga(),
    SignupSaga()
  ]
}
