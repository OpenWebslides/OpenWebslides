import { put, call } from 'redux-saga/effects';

import { setUserDecksIds } from 'actions/entities/users';

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
  yield put(setUserDecksIds(userId, deckIds));
}

export default fetchUserDecksIdsFlow;


