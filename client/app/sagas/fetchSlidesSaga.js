import { takeLatest, put, call } from 'redux-saga/effects';
import { FETCH_SLIDES } from 'actions/slideActions';

import convertToState from 'lib/convert-to-state';
import fetchDeckApi from 'api/fetchDeckApi';

function* doFetchDeck(action) {
  try {
    const HTMLResponse = yield call(fetchDeckApi, action.meta.deckId);

    const state = yield convertToState(HTMLResponse);

    yield put({ type: 'FETCH_SLIDES_SUCCESS', payload: state });

    const activeSlideId = state.slideSequence - 1;

    yield put({
      type: 'SET_ACTIVE_SLIDE',
      payload: { slideId: activeSlideId },
    });
  } catch (e) {
    console.log(e);
  }
}

function* fetchSlidesWatcher() {
  yield takeLatest(FETCH_SLIDES, doFetchDeck);
}

export default fetchSlidesWatcher;
