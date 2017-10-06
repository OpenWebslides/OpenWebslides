import { takeLatest, call, put } from 'redux-saga/effects';

import {
  DECK_DELETION_REQUEST_SUCCESS,
} from 'actions/entities/decks';
import { SIGNOUT } from 'actions/signoutActions';

import deleteDeckApi from 'api/deleteDeckApi';

export function* deleteDeckFlow(deckId) {
    yield call(deleteDeckApi, deckId);
    yield put({ type: DECK_DELETION_REQUEST_SUCCESS });
}


