import { takeLatest, put, call } from 'redux-saga/effects';

import { SIGNOUT } from 'actions/signoutActions';
import { PROFILE_PAGE_START_REQUESTS, PROFILE_PAGE_USER_INFO_FAILURE, PROFILE_PAGE_REQUESTS_SUCCESS } from 'actions/app/profile-page';

// other sagas:
import { fetchUserFlow } from 'sagas/entities/users/fetchUserSaga';
import { fetchUserCollaborationsFlow } from 'sagas/entities/users/fetchUserCollaborationsSaga';
import { fetchUserDecksIdsFlow } from 'sagas/entities/users/fetchUserDecksIdsSaga';

export function* loadProfilePageInfoFlow(action) {
  try {
    yield call(fetchUserFlow, action.payload);
    yield call(fetchUserCollaborationsFlow, action.payload);
    yield call(fetchUserDecksIdsFlow, action.payload);
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put({
        type: PROFILE_PAGE_USER_INFO_FAILURE,
        payload: {
          message: 'You are not signed in!',
        },
      });
    }
    else {
      yield put({
        type: PROFILE_PAGE_USER_INFO_FAILURE,
        payload: {
          message: error.message,
        },
      });
    }
  }
  yield put({ type: PROFILE_PAGE_REQUESTS_SUCCESS });
}

function* fetchUserWatcher() {
  yield takeLatest(PROFILE_PAGE_START_REQUESTS, loadProfilePageInfoFlow);
}

export default fetchUserWatcher;
