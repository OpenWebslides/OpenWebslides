import { takeLatest } from 'redux-saga/effects';

import { CHECK_EMAIL } from 'actions/checkEmail';

// Stubbed implementation, waiting for api endpoint
export function doCheckEmail(action) {
  setTimeout(() => {
    if (action.meta.email === 'rein.vanimschoot@gmail.com') {
      action.meta.reject({ email: 'Email is already taken' });
    } else {
      action.meta.resolve();
    }
  }, 1000);
}

export default function* checkEmailAvailableWatcher() {
  yield takeLatest(CHECK_EMAIL, doCheckEmail);
}
