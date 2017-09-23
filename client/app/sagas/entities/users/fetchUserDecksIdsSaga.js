import { put, call } from 'redux-saga/effects';

import { FETCH_USER_DECKS_IDS_SUCCESS } from 'actions/entities/users';

import fetchUserDecksIds from 'api/fetchUserDecksIdsApi';

function deckIdJsonToId(deck) {
  return parseInt(deck.id, 10);
}

export function* fetchUserDecksIdsFlow(userId) {
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

