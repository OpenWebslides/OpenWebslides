import { takeEvery, select, put } from 'redux-saga/effects';

import { ADD_SLIDE_TO_DECK } from 'actions/entities/decks';
import { addSlide } from 'actions/entities/slides';
import { getDeckById } from 'selectors/entities/decks';
import { generateSlideId } from 'lib/convert-to-state/generateIds';

function* doAddSlideToDeck(action) {
  try {
    const deck = yield select(getDeckById, action.meta.deckId);
    const slideId = generateSlideId(deck.id, deck.slideSequence);

    yield put(addSlide(slideId, deck.id));
  }
  catch (e) {
    console.error(e);
  }
}

function* addSlideToDeckWatcher() {
  yield takeEvery(ADD_SLIDE_TO_DECK, doAddSlideToDeck);
}

export default addSlideToDeckWatcher;
