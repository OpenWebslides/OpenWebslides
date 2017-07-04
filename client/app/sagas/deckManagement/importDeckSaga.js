import { takeLatest, call, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { DECK_IMPORT_REQUEST } from 'actions/importDeckActions';
import importDeckApi from 'api/importDeckApi';

const authState = state => state.app.authentication;

export function* importDeckFlow(action) {
  const { resolve, reject } = action.meta;

  try {
    const { id } = yield select(authState);
    const { file } = action.meta.values;

    yield call(importDeckApi, file, id);

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
function* importDeckWatcher() {
  yield takeLatest(DECK_IMPORT_REQUEST, importDeckFlow);
}

export default importDeckWatcher;
