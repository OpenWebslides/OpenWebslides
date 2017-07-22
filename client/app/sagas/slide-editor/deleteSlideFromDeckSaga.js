import { takeLatest, put, select } from 'redux-saga/effects';

import { DELETE_SLIDE_FROM_DECK } from 'actions/entities/decks';
import { deleteSlide } from 'actions/entities/slides';

import { getActiveSlideId } from 'selectors/app/slide-editor';
import { getSlidesById, getSlideById } from 'selectors/entities/slides';
import { getContentItemsById } from 'selectors/entities/content-items';

function* getContentItemIdsToDelete(contentItemIds) {
  const contentItemsToDelete = [];
  const state = yield select();
  const contentItems = getContentItemsById(state);

  (function findContentItemsToDelete(contentItemsArr) {
    contentItemsArr.forEach(contentItemId => {
      contentItemsToDelete.push(contentItems[contentItemId].id);
      if (contentItems[contentItemId].childItemIds) {
        findContentItemsToDelete(contentItems[contentItemId].childItemIds);
      }
    });
  })(contentItemIds);
  return contentItemsToDelete;
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
