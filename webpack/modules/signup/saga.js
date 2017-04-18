import { takeLatest, call, put } from 'redux-saga/effects'

import { REQUEST_SIGNUP } from './constants'
import signupApiCall from './api'

function * signupFlow (action) {
  const { email, password } = action.meta

  const responseBody = yield call(signupApiCall, email, password)
}

function * signupWatcher () {
  console.log('Watching!')
  yield takeLatest(REQUEST_SIGNUP, signupFlow)
}

export default signupWatcher
