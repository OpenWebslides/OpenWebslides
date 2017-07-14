import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_DECK_CONTENT } from 'actions/deckActions';

import convertToPrint from 'lib/convert-to-print';

function* doFetchDeck() {
  try {
    const state = yield convertToPrint();
    yield put({ type: 'FETCH_DECK_CONTENT_SUCCESS', payload: state });
  } catch (e) {
    console.log(e);
  }
}

function* fetchDeckContentWatcher() {
  yield takeLatest(FETCH_DECK_CONTENT, doFetchDeck);
}

export default fetchDeckContentWatcher;
