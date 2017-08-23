import { takeLatest, put, call } from 'redux-saga/effects';
import { FETCH_DECK, FETCH_DECK_SUCCESS } from 'actions/entities/decks';

import convertToState from 'lib/convert-to-state';
import fetchDeckApi from 'api/fetchDeckApi';

/* eslint-disable no-unused-vars */
import {
  testDeckEmpty,
} from 'assets/files/test-decks/empty';
import {
  testDeckFlamesFixed,
} from 'assets/files/test-decks/flamesFixed';
import {
  testDeckContentItemViewTypes,
} from 'assets/files/test-decks/contentItemViewTypes';
/* eslint-enable */

function* doFetchDeck(action) {
  try {
    const HTMLResponse = yield call(fetchDeckApi, action.meta.deckId);
    // const HTMLResponse = testDeckFlamesFixed; // testDeckEmpty;

    const entities = yield convertToState(action.meta.deckId, HTMLResponse);
    const payload = {
      deckId: action.meta.deckId,
      ...entities,
    };

    yield put({ type: FETCH_DECK_SUCCESS, payload });
  }
  catch (e) {
    console.log(e);
  }
}

function* fetchDeckWatcher() {
  yield takeLatest(FETCH_DECK, doFetchDeck);
}

export default fetchDeckWatcher;
