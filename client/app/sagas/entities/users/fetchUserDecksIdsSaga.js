import { takeLatest, put, call } from 'redux-saga/effects';

import {
  FETCH_USER_DECKS_IDS_SUCCESS,
  FETCH_USER_DECKS_IDS,
  FETCH_USER_DECKS_IDS_FAILURE,
} from 'actions/entities/users';
import { SIGNOUT } from 'actions/signoutActions';

import fetchUserDecksIds from 'api/fetchUserDecksIdsApi';

function deckIdJsonToId(deck) {
  return parseInt(deck.id, 10);
}

export function* fetchUserDecksIdsFlow(action) {
  try {
    const userId = action.meta.userId;
    const responseUserDecksIds = yield call(
      fetchUserDecksIds,
      userId,
    );
    if (!responseUserDecksIds) {
      throw new Error('Received undefined decks.');
    }
    const deckIds = responseUserDecksIds.data.map(deckIdJsonToId);
    yield put(
      {
        type: FETCH_USER_DECKS_IDS_SUCCESS,
        payload: { id: userId, deckIds },
      },
    );
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put({
        type: FETCH_USER_DECKS_IDS_FAILURE,
        payload: {
          message: 'You are not signed in!',
        },
      });
    }
    else {
      yield put({
        type: FETCH_USER_DECKS_IDS_FAILURE,
        payload: {
          message: error.message,
        },
      });
    }
  }
}

function* fetchUserDecksIdsWatcher() {
  yield takeLatest(FETCH_USER_DECKS_IDS, fetchUserDecksIdsFlow);
}

export default fetchUserDecksIdsWatcher;
