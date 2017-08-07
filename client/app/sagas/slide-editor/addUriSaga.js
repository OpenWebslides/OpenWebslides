import { takeLatest, call, put, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { getActiveSlideId } from 'selectors/app/slide-editor';
import { ADD_URI } from 'actions/app/slide-editor';

import { ADD_CONTENT_ITEM_TO_SLIDE } from 'actions/entities/slides';

export function* doAddUri(action) {
  const { resolve, reject } = action.meta;

  try {
    const activeSlideId = yield select(getActiveSlideId);

    const { contentItemType, values: { imageUrl, altText } } = yield action.meta;

    yield put({ type: ADD_CONTENT_ITEM_TO_SLIDE,
      meta: { slideId: activeSlideId,
        contentItemType,
        contentItemTypeProps: { src: imageUrl, altText } } });

    yield call(resolve);
  }
  catch (error) {
    console.log(error);
    let errorMessage;

    switch (error.statusCode) {
      default:
        yield (errorMessage = { _error: 'Something went wrong on our end.' });
    }

    yield call(reject, new SubmissionError(errorMessage));
  }
}

function* addUriWatcher() {
  yield takeLatest(ADD_URI, doAddUri);
}

export default addUriWatcher;
