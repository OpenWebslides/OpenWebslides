import { takeLatest, call, put } from 'redux-saga/effects';
import getDecksCall from 'api/requestUserDecksCall';

import {
  REQUEST_DECK_LIST,
  REQUEST_DECK_LIST_FAILURE,
  REQUEST_DECK_LIST_SUCCESS,
} from 'actions/deckManagementActions';

function mapJsonDeckToDeck(jsonDeck) {
  const deck = {};
  deck.id = jsonDeck.id;
  deck.name = jsonDeck.attributes.name;
  deck.description = jsonDeck.attributes.description;
  return deck;
}

export function* requestDeckListFlow(action) {
  try {
    const userID = action.meta;
    const responseListOfDecks = yield call(getDecksCall, userID);
    if (!responseListOfDecks) {
      throw new Error('Received undefined list.');
    }
    const listOfDecks = responseListOfDecks.map(responseDeck =>
      mapJsonDeckToDeck(responseDeck),
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
  yield takeLatest(REQUEST_DECK_LIST, requestDeckListFlow);
}

export default userDeckRequestWatcher;
