import { takeLatest, call, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { DECK_CREATION_REQUEST } from 'actions/createDeckActions';
import createDeckApi from 'api/createDeckApi';

const authState = state => state.app.authentication;

export function* createDeckFlow(action) {
  const { resolve, reject } = action.meta;
  try {
    const { id, authToken } = yield select(authState);
    const { title, description } = action.meta.values;

    yield call(createDeckApi, title, description, id, authToken);

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
  yield takeLatest(DECK_CREATION_REQUEST, createDeckFlow);
}

export default createDeckWatcher;
