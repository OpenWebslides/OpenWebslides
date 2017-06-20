import { takeLatest, call, put, select } from 'redux-saga/effects';

import {
  DECK_DELETION_REQUEST,
  DECK_DELETION_REQUEST_FAILURE,
  DECK_DELETION_REQUEST_SUCCESS,
} from 'actions/deckManagementActions';
import deleteDeckApi from 'api/deleteDeckApi';

const authState = state => state.app.authentication;

export function* deleteDeckFlow(action) {
  try {
    const { authToken } = yield select(authState);
    const deckId = action.payload;
    yield call(deleteDeckApi, deckId, authToken);
    yield put({ type: DECK_DELETION_REQUEST_SUCCESS });
  } catch (error) {
    yield put({ type: DECK_DELETION_REQUEST_FAILURE, payload: error.message });
  }
}

function* deleteDeckWatcher() {
  yield takeLatest(DECK_DELETION_REQUEST, deleteDeckFlow);
}

export default deleteDeckWatcher;
