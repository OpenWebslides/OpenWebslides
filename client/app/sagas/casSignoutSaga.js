import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import casSignout from 'api/casSignoutApi';
import { signout } from 'actions/signoutActions';
import { authTypes } from 'constants/auth';

export function* doCasSignout(dispatch) {
  yield call(casSignout);

  yield put(signout());
}

function* casSignoutWatcher() {
  yield takeLatest(authTypes.CAS_SIGNOUT, doCasSignout);
}

export default casSignoutWatcher;
