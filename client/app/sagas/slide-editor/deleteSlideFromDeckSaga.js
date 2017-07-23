import { takeLatest, put, select } from 'redux-saga/effects';

import { DELETE_SLIDE_FROM_DECK } from 'actions/entities/decks';
import { deleteSlide } from 'actions/entities/slides';

import { getActiveSlideId } from 'selectors/app/slide-editor';
import { getSlidesById, getSlideById } from 'selectors/entities/slides';
import { getContentItemDescendantItemIdsById } from 'selectors/entities/content-items';

function* getContentItemIdsToDelete(contentItemIds) {
  let result = [];
  let descendantItemIds;
  let i;

  for (i = 0; i < contentItemIds.length; i++) {
    descendantItemIds = yield select(getContentItemDescendantItemIdsById, contentItemIds[i]);
    result = result.concat(descendantItemIds);
  }

  return result;
}

function* doDeleteSlideFromDeck(action) {
  try {
    const { deckId, slideId } = action.meta;
    const slide = yield select(getSlideById, slideId);
    const contentItemIdsToDelete = yield getContentItemIdsToDelete(slide.contentItemIds);

    const activeSlideId = yield select(getActiveSlideId);
    let newActiveSlideId;

    if (activeSlideId === slideId) {
      const slides = yield select(getSlidesById);
      const slideIds = Object.keys(slides);
      const currentSlideIndex = slideIds.indexOf(slideId);
      newActiveSlideId = currentSlideIndex === 0
        ? slideIds[currentSlideIndex + 1]
        : slideIds[currentSlideIndex - 1];
    } else {
      newActiveSlideId = null;
    }

    yield put(deleteSlide(slideId, deckId, contentItemIdsToDelete, newActiveSlideId));

  } catch (e) {
    console.error(e);
  }
}

function* deleteSlideFromDeckWatcher() {
  yield takeLatest(DELETE_SLIDE_FROM_DECK, doDeleteSlideFromDeck);
}

export default deleteSlideFromDeckWatcher;
