import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_SLIDES } from 'actions/fetchSlidesActions';

import parseDeckString from '../../lib/parseDeckString';

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
    <h1>This is a subtitle with <em>emphasized text</em> and even <strong>strong text</strong></h1>
  </section>
  <div class="progress"></div>
  <footer class="badge">
    <a href="https://github.com/OpenWebSlides/EmptySlidedeck">Fork me on GitHub</a>
  </footer>'`;

function* doFetchSlides() {
  try {
    const deckData = {
      meta: {
        title: 'Test presentation',
        description: 'Best presentation',
      },
    };

    const slideData = yield parseDeckString(deckString);
    const stateObject = yield Object.assign({}, deckData, slideData);

    yield put({ type: 'FETCH_SLIDES_SUCCESS', payload: stateObject });
  } catch (e) {
    console.log(e);
  }
}

function* fetchSlidesWatcher() {
  yield takeLatest(FETCH_SLIDES, doFetchSlides);
}

export default fetchSlidesWatcher;
