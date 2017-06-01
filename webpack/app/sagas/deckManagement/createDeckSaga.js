import { takeLatest, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { REQUEST_DECK_CREATION } from 'actions/createDeckActions';

export function* createDeckFlow() {
  const { resolve, reject } = action.meta;

  try {
    const { title, description } = action.meta.values;

    yield call(createDeckApi, title, description);

    yield call(resolve);
  } catch (error) {
    let errorMessage;

    switch (error.statusCode) {
      case 422:
        yield (errorMessage = error.validationErrors);
        break;
      default:
        yield (errorMessage = { _error: 'Something went wrong on our end.' });
    }
    yield call(reject, new SubmissionError(errorMessage));
  }
}
function* createDeckWatcher() {
  yield takeLatest(REQUEST_DECK_CREATION, createDeckFlow);
}
