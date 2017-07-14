import { takeLatest, put, select } from 'redux-saga/effects';

import { DELETE_SLIDE, DELETE_SLIDE_WITH_CONTENT, SET_ACTIVE_SLIDE } from 'actions/slideActions';
import { DELETE_CONTENT_BLOCKS } from 'actions/contentBlockActions';

function* getContentBlocksToDelete(contentItemIds) {
  const contentBlocksToDelete = [];
  const state = yield select();
  const contentItems = state.entities.contentItems.byId;

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
    const { slideId } = action.meta;
    const state = yield select();
    const slide = state.entities.slides.byId[slideId];
    const contentBlocksToDelete = yield getContentBlocksToDelete(slide.contentItemIds);

    if (state.app.editor.slides.active === slideId) {
      const slideIds = Object.keys(state.entities.slides.byId);

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
      payload: { slideId },
    });
  } catch (e) {
    console.log(e);
  }
}

function* fetchSlidesWatcher() {
  yield takeLatest(DELETE_SLIDE_WITH_CONTENT, doDeleteSlide);
}

export default fetchSlidesWatcher;
