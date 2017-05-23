import { takeLatest, call, put } from 'redux-saga/effects';
import getDecksCall from 'api/userDecksApiCall';

import {
  REQUEST_DECK_LIST,
  REQUEST_DECK_LIST_FAILURE,
  REQUEST_DECK_LIST_SUCCESS,
} from 'actions/deckManagementActions';

export function* requestDeckListFlow() {
  try {
    const responseListOfDecks = yield call(getDecksCall);
    if (!responseListOfDecks) {
      throw new Error('Received undefined list.');
    }
    const listOfDecks = responseListOfDecks.map(
      responseDeck => null, // TODO When api supports getting decks from specific user
    );
    yield put({
      type: REQUEST_DECK_LIST_SUCCESS,
      payload: {
        listOfDecks,
      },
    });
  } catch (error) {
    yield put({
      type: REQUEST_DECK_LIST_FAILURE,
      payload: {
        message: error.message,
      },
    });
  }
}

function* userDeckRequestWatcher() {
  yield takeLatest(REQUEST_DECK_LIST, requestDeckListFlow());
}

export default userDeckRequestWatcher;
