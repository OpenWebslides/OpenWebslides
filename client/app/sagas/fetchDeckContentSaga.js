import { takeLatest, put } from 'redux-saga/effects';

import { flamesState } from 'constants/exampleState';

function* doFetchDeckContent() {
  try {
    const state = flamesState;
    yield put({ type: 'FETCH_DECK_CONTENT_SUCCESS', payload: state }); // TODO: make some actual actions for this...
  } catch (e) {
    console.log(e);
  }
}

function* fetchDeckContentWatcher() {
  yield takeLatest('FETCH_DECK_CONTENT', doFetchDeckContent);
}

export default fetchDeckContentWatcher;
