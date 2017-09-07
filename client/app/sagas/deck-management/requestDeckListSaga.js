import { takeLatest, call, put } from 'redux-saga/effects';
import getDecksCall from 'api/requestUserDecksCall';

import {
  REQUEST_DECK_LIST,
  REQUEST_DECK_LIST_FAILURE,
  REQUEST_DECK_LIST_SUCCESS,
} from 'actions/deckManagementActions';
import { SIGNOUT } from 'actions/signoutActions';
import { updateToken } from 'actions/updateTokenActions';

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
    const { responseListOfDecks, newToken } = yield call(getDecksCall, userID);

    if (newToken) {
      const strippedToken = newToken.replace(/Bearer /, '');
      yield put(updateToken(strippedToken));
    }

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
  }
  catch (error) {
    debugger;
    console.log(error);
    console.log(error.statusCode);
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put({
        type: REQUEST_DECK_LIST_FAILURE,
        payload: {
          message: 'You are not signed in',
        },
      });
    }
    else {
      yield put({
        type: REQUEST_DECK_LIST_FAILURE,
        payload: {
          message: error.message,
        },
      });
    }
  }
}

function* userDeckRequestWatcher() {
  yield takeLatest(REQUEST_DECK_LIST, requestDeckListFlow);
}

export default userDeckRequestWatcher;
