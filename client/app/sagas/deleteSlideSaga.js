import { takeLatest, put, select } from 'redux-saga/effects';

import { setActiveSlideId } from 'actions/app/slide-editor';
import { DELETE_SLIDE_WITH_CONTENT, deleteSlide } from 'actions/entities/slides';

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

function* doDeleteSlide(action) {
  try {
    const { slideId, deckId } = action.meta;
    const state = yield select();
    const slide = getSlideById(state, slideId);
    const contentItemIdsToDelete = yield getContentItemIdsToDelete(slide.contentItemIds);

    if (getActiveSlideId(state) === slideId) {
      const slideIds = Object.keys(getSlidesById(state));
      const currentSlideIndex = slideIds.indexOf(slideId);
      const previousSlideId = currentSlideIndex === 0
        ? slideIds[currentSlideIndex + 1]
        : slideIds[currentSlideIndex - 1];

      yield put(setActiveSlideId(previousSlideId));
    }

    yield put(deleteSlide(slideId, deckId, contentItemIdsToDelete));

  } catch (e) {
    console.log(e);
  }
}

function* fetchSlidesWatcher() {
  yield takeLatest(DELETE_SLIDE_WITH_CONTENT, doDeleteSlide);
}

export default fetchSlidesWatcher;
