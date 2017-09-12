import { takeLatest, call, put } from 'redux-saga/effects';

import {
  DECK_DELETION_REQUEST,
  DECK_DELETION_REQUEST_FAILURE,
  DECK_DELETION_REQUEST_SUCCESS,
} from 'actions/deckManagementActions';
import { SIGNOUT } from 'actions/signoutActions';

import deleteDeckApi from 'api/deleteDeckApi';

export function* deleteDeckFlow(action) {
  try {
    const deckId = action.payload;
    yield call(deleteDeckApi, deckId);
    yield put({ type: DECK_DELETION_REQUEST_SUCCESS });
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put({ type: DECK_DELETION_REQUEST_FAILURE, payload: error.message });
    }
    else {
      yield put({ type: DECK_DELETION_REQUEST_FAILURE, payload: error.message });
    }
  }
}

function* deleteDeckWatcher() {
  yield takeLatest(DECK_DELETION_REQUEST, deleteDeckFlow);
}

export default deleteDeckWatcher;
