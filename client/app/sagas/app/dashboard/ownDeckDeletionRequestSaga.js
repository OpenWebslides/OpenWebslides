import { takeLatest, call, put } from 'redux-saga/effects';

import {
  OWN_DECK_DELETION_REQUEST_START,
  ownDeckDeletionRequestFailure,
  ownDeckDeletionRequestSuccess,
} from 'actions/app/dashboard/own-decks';

import destroyDeckSaga from 'sagas/entities/decks/destroyDeckSaga';

import { SIGNOUT } from 'actions/signoutActions';


export function* ownDeckDeletionRequestFlow(action) {
  try {
    const deckId = action.meta;
    yield call(destroyDeckSaga, deckId);
    yield put(ownDeckDeletionRequestSuccess(deckId));
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put(ownDeckDeletionRequestFailure(action.meta, 'You are not signed in!'));
    }
    else {
      yield put(ownDeckDeletionRequestFailure(action.meta, error.message));
    }
  }
}

function* ownDeckDeletionRequestWatcher() {
  yield takeLatest(OWN_DECK_DELETION_REQUEST_START, ownDeckDeletionRequestFlow);
}

export default ownDeckDeletionRequestWatcher;
