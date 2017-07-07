import { takeLatest, put, call } from 'redux-saga/effects';
import { FETCH_DECK, FETCH_DECK_SUCCESS } from 'actions/deckActions';

import convertToState from 'lib/convert-to-state';
import fetchDeckApi from 'api/fetchDeckApi';

const HTMLResponse = `
  <header class="caption">
    <h1>Presentation Title</h1>
    <p><a href="">Author</a>, <a href="http://www.ugent.be/">Ghent University</a>.</p>
  </header>
  <section class="slide">
    <h1>First Slide</h1>
  </section>
  <section class="slide">
    <p>This is a subtitle with <em>emphasized text</em> and even <strong>strong text</strong></p>
  </section>
  <div class="progress"></div>
  <footer class="badge">
    <a href="https://github.com/OpenWebSlides/EmptySlidedeck">Fork me on GitHub</a>
  </footer>'`;

function* doFetchDeck(action) {
  try {
    // const HTMLResponse = yield call(fetchDeckApi, action.meta.deckId);

    const state = yield convertToState(HTMLResponse);

    yield put({ type: 'FETCH_DECK_SUCCESS', payload: state });

    const activeSlideId = state.slideSequence - 1;

    yield put({
      type: 'SET_ACTIVE_SLIDE',
      payload: { slideId: activeSlideId },
    });
  } catch (e) {
    console.log(e);
  }
}

function* fetchDeckWatcher() {
  yield takeLatest(FETCH_DECK, doFetchDeck);
}

export default fetchDeckWatcher;
