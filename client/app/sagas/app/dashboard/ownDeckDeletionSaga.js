import { takeLatest, call, put } from 'redux-saga/effects';

import {
  OWN_DECK_DELETION_REQUEST,
  OWN_DECK_DELETION_REQUEST_FAILURE,
} from 'actions/app/dashboard/own-decks';

import {
  DECK_DELETION_SUCCESS,
} from 'actions/entities/decks';

import { SIGNOUT } from 'actions/signoutActions';

import deleteDeckApi from 'api/deleteDeckApi';

export function* deleteOwnDeckFlow(action) {
  try {
    const deckId = action.meta;
    yield call(deleteDeckApi, deckId);
    yield put({ type: DECK_DELETION_SUCCESS, payload: deckId });
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
    }
    else {
      yield put({ type: OWN_DECK_DELETION_REQUEST_FAILURE, payload: error.message });
    }
  }
}

function* deleteOwnDeckWatcher() {
  yield takeLatest(OWN_DECK_DELETION_REQUEST, deleteOwnDeckFlow);
}

export default deleteOwnDeckWatcher;
