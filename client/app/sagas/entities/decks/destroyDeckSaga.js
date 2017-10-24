import { call, put } from 'redux-saga/effects';

import {
  deleteDeck,
} from 'actions/entities/decks';

import deleteDeckApi from 'api/deleteDeckApi';

export function* destroyDeckFlow(deckId) {
  yield call(deleteDeckApi, deckId);
  yield put(deleteDeck(deckId));
}

export default destroyDeckFlow;
