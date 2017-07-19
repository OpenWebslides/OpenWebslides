import { takeLatest, put, select } from 'redux-saga/effects';

import { DELETE_SLIDE, DELETE_SLIDE_WITH_CONTENT, SET_ACTIVE_SLIDE } from 'actions/slideActions';
import { DELETE_CONTENT_BLOCKS } from 'actions/contentBlockActions';

import { getActiveSlideId } from 'selectors/app/editor';
import { getSlidesById, getSlideById } from 'selectors/entities/slides';
import { getContentItemsById } from 'selectors/entities/content-items';

function* getContentBlocksToDelete(contentItemIds) {
  const contentBlocksToDelete = [];
  const state = yield select();
  const contentItems = getContentItemsById(state);

  (function findContentBlocksToDelete(contentItemsArr) {
    contentItemsArr.forEach(contentItemId => {
      if (contentItems[contentItemId].childItemIds) {
        findContentBlocksToDelete(contentItems[contentItemId].childItemIds);
      } else {
        contentBlocksToDelete.push(contentItems[contentItemId].id);
      }
    });
  })(contentItemIds);
  return contentBlocksToDelete;
}

function* doDeleteSlide(action) {
  try {
    const { deckId, slideId } = action.meta;
    const state = yield select();
    const slide = getSlideById(state, slideId);
    const contentBlocksToDelete = yield getContentBlocksToDelete(slide.contentItemIds);

    if (getActiveSlideId(state) === slideId) {
      const slideIds = Object.keys(getSlidesById(state));

      const currentSlideIndex = slideIds.indexOf(slideId);
      const previousSlideId = currentSlideIndex === 0
        ? slideIds[currentSlideIndex + 1]
        : slideIds[currentSlideIndex - 1];

      yield put({
        type: SET_ACTIVE_SLIDE,
        payload: { slideId: previousSlideId },
      });
    }

    yield put({
      type: DELETE_CONTENT_BLOCKS,
      payload: { contentBlocksToDelete },
    });

    yield put({
      type: DELETE_SLIDE,
      payload: { deckId, slideId },
    });
  } catch (e) {
    console.log(e);
  }
}

function* fetchSlidesWatcher() {
  yield takeLatest(DELETE_SLIDE_WITH_CONTENT, doDeleteSlide);
}

export default fetchSlidesWatcher;
