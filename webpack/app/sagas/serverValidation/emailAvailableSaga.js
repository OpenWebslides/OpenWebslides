import { takeLatest } from 'redux-saga/effects';

import {
  CHECK_EMAIL_AVAILABLE,
} from 'actions/serverValidationActions';

// Stubbed implementation, waiting for api endpoint
function checkEmailAvailable(action) {
  setTimeout(() => {
    if (action.meta.email === 'rein.vanimschoot@gmail.com') {
      action.meta.reject({ email: 'Email is already taken' });
    } else {
      action.meta.resolve();
    }
  }, 1000);
}

export default function* checkEmailAvailableWatcher() {
  yield takeLatest(CHECK_EMAIL_AVAILABLE, checkEmailAvailable);
}
