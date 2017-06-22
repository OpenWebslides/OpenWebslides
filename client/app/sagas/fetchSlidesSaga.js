import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_SLIDES } from 'actions/slideActions';

import convertToState from 'lib/convert-to-state';

const deckString = `
  <header class="caption">
    <h1>Presentation Title</h1>
    <p><a href="">Author</a>, <a href="http://www.ugent.be/">Ghent University</a>.</p>
  </header>
  <section class="slide">
    <h1>First Slide</h1>
  </section>
  <section class="slide">
    <h1>Second Slide</h1>
    <section>
      <p>This is a subtitle with <em>emphasized text</em> and even <strong>strong text</strong></p>
      <p>This is a subtitle with <em>emphasized text</em> and even <strong>strong text</strong></p>
    </section>
  </section>
  <div class="progress"></div>
  <footer class="badge">
    <a href="https://github.com/OpenWebSlides/EmptySlidedeck">Fork me on GitHub</a>
  </footer>'`;

function* doFetchSlides() {
  try {
    const state = yield convertToState(deckString);
    yield put({ type: 'FETCH_SLIDES_SUCCESS', payload: state });

    const slideId = yield Object.keys(state.slides).length - 1;
    yield put({ type: 'SET_ACTIVE_SLIDE', payload: { slideId } });
  } catch (e) {
    console.log(e);
  }
}

function* fetchSlidesWatcher() {
  yield takeLatest(FETCH_SLIDES, doFetchSlides);
}

export default fetchSlidesWatcher;
