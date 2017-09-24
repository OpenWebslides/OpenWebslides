import { takeLatest, put, call, select } from 'redux-saga/effects';

import { SIGNOUT } from 'actions/signoutActions';
import { PROFILE_PAGE_START_REQUESTS, PROFILE_PAGE_USER_INFO_FAILURE, PROFILE_PAGE_REQUESTS_SUCCESS } from 'actions/app/profile-page';

// other sagas:
import { fetchUserFlow } from 'sagas/entities/users/fetchUserSaga';
import { fetchUserCollaborationsFlow } from 'sagas/entities/users/fetchUserCollaborationsSaga';
import { fetchUserDecksIdsFlow } from 'sagas/entities/users/fetchUserDecksIdsSaga';
import { fetchDeckMetadataFlow } from 'sagas/entities/decks/fetchDeckMetadataSaga';

// Selectors:
import { getUserDecksIds, getUserCollaborationsIds } from 'selectors/entities/users';

export function* loadProfilePageInfoFlow(action) {
  try {
    yield call(fetchUserFlow, action.payload);
    yield call(fetchUserCollaborationsFlow, action.payload);
    yield call(fetchUserDecksIdsFlow, action.payload);

    const deckIds = yield select(getUserDecksIds, action.payload);
    const collaborationsIds = yield select(getUserCollaborationsIds, action.payload);

    for (let i = 0; i < deckIds.length; i += 1) {
        // Note to future refactorer:
        // We need a traditional loop because of limitation on `yield`, don't try using .foreach
      const deckId = deckIds[i];
      yield call(fetchDeckMetadataFlow, deckId);
    }

    for (let i = 0; i < collaborationsIds.length; i += 1) {
      const contributionId = collaborationsIds[i];
      yield call(fetchDeckMetadataFlow, contributionId);
    }
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
