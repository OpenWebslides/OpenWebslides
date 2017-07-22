import { takeEvery, select, put } from 'redux-saga/effects';

import { ADD_CONTENT_ITEM_TO_SLIDE } from 'actions/entities/slides';
import { addContentItem } from 'actions/entities/content-items';
import { getSlideById } from 'selectors/entities/slides';
import { generateContentItemId } from 'lib/convert-to-state/generateIds';

function* doAddContentItem(action) {
  try {
    const slide = yield select(getSlideById, action.meta.slideId);
    const contentItemId = generateContentItemId(slide.id, slide.contentItemSequence);

    yield put(addContentItem(contentItemId, slide.id, action.meta.contentItemType));

  } catch(e) {
    console.error(e);
  }
}

function* addContentItemWatcher() {
  yield takeEvery(ADD_CONTENT_ITEM_TO_SLIDE, doAddContentItem);
}

export default addContentItemWatcher;
