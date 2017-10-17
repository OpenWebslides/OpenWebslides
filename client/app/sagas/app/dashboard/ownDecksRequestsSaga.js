import { takeLatest, put, call, select } from 'redux-saga/effects';

import { SIGNOUT } from 'actions/signoutActions';
import {
  OWN_DECKS_REQUESTS_START,
  OWN_DECKS_REQUESTS_FAILURE,
  OWN_DECKS_REQUESTS_SUCCESS,
} from 'actions/app/dashboard/own-decks';

// other sagas:
import { fetchUserFlow } from 'sagas/entities/users/fetchUserSaga';
import { fetchUserDecksIdsFlow } from 'sagas/entities/users/fetchUserDecksIdsSaga';
import { fetchDeckMetadataFlow } from 'sagas/entities/decks/fetchDeckMetadataSaga';

// Selectors:
import { getUserDecksIds } from 'selectors/entities/users';

export function* requestOwnDecksFlow(action) {
  try {
    yield call(fetchUserFlow, action.payload);
    yield call(fetchUserDecksIdsFlow, action.payload);

    const deckIds = yield select(getUserDecksIds, action.payload);

    for (let i = 0; i < deckIds.length; i += 1) {
      // Note to future refactorer:
      // We need a traditional loop because of limitation on `yield`, don't try using .foreach
      const deckId = deckIds[i];
      yield call(fetchDeckMetadataFlow, deckId);
    }
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put({
        type: OWN_DECKS_REQUESTS_FAILURE,
        payload: {
          message: 'You are not signed in!',
        },
      });
    }
    else {
      yield put({
        type: OWN_DECKS_REQUESTS_FAILURE,
        payload: {
          message: error.message,
        },
      });
    }
  }

  yield put({ type: OWN_DECKS_REQUESTS_SUCCESS });
}

function* ownDecksRequestsWatcher() {
  yield takeLatest(OWN_DECKS_REQUESTS_START, requestOwnDecksFlow);
}

export default ownDecksRequestsWatcher;
