import { takeLatest, put, call } from 'redux-saga/effects';
import { FETCH_DECK, FETCH_DECK_SUCCESS } from 'actions/entities/decks';
import { SIGNOUT } from 'actions/signoutActions';

import convertToState from 'lib/convert-to-state';
import fetchDeckHtmlApi from 'api/fetchDeckHtmlApi';
import fetchDeckJsonApi from 'api/fetchDeckJsonApi';

/* eslint-disable no-unused-vars */
import {
  testDeckEmpty,
} from 'assets/files/test-decks/empty';
import {
  testDeckFlamesFixed,
} from 'assets/files/test-decks/flamesFixed';
import {
  testDeckContentItemViewTypes,
} from 'assets/files/test-decks/contentItemViewTypes';
/* eslint-enable */

function* doFetchDeck(action) {
  try {
    const htmlString = yield call(fetchDeckHtmlApi, action.meta.deckId);
    const metadata = yield call(fetchDeckJsonApi, action.meta.deckId);

    const { included } = metadata;

    const assetLinks = {};

    if (included) {
      included.forEach((asset) => {
        const { id, filename, links: { raw } } = asset;
        assetLinks[id] = { src: raw, filename };
      });
    }

    const entities = yield convertToState(action.meta.deckId, htmlString, assetLinks);
    const payload = {
      deckId: action.meta.deckId,
      metadata,
      ...entities,
    };

    yield put({ type: FETCH_DECK_SUCCESS, payload });
  }
  catch (e) {
    if (e.statusCode === 401) {
      yield put({ type: SIGNOUT });
    }
    console.log(e);
  }
}

function* fetchDeckWatcher() {
  yield takeLatest(FETCH_DECK, doFetchDeck);
}

export default fetchDeckWatcher;
