import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_DECK_CONTENT } from 'actions/deckActions';

import convertToPrint from 'lib/convert-to-print';

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

function* doFetchDeck() {
  try {
    const state = yield convertToPrint(HTMLResponse);

    yield put({ type: 'FETCH_DECK_CONTENT_SUCCESS', payload: state });
  } catch (e) {
    console.log(e);
  }
}

function* fetchDeckContentWatcher() {
  yield takeLatest(FETCH_DECK_CONTENT, doFetchDeck);
}

export default fetchDeckContentWatcher;
