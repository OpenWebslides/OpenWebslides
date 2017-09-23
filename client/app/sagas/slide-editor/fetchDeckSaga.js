import { takeLatest, put , call  } from 'redux-saga/effects';
import { FETCH_DECK, fetchDeckSuccess } from 'actions/entities/decks';
import { SIGNOUT } from 'actions/signoutActions';

import convertToState from 'lib/convert-to-state';
import fetchDeckHtmlApi from 'api/fetchDeckHtmlApi';
import fetchDeckJsonApi from 'api/fetchDeckJsonApi';

function* doFetchDeck(action) {
  try {
    const htmlString = yield call(fetchDeckHtmlApi, action.meta.deckId);
    const metadata = yield call(fetchDeckJsonApi, action.meta.deckId, true);

    const { included } = metadata;

    const assetLinks = {};

    if (included) {
      included.forEach((asset) => {
        const { id, filename, links: { raw } } = asset;
        assetLinks[id] = { src: raw, filename };
      });
    }

    const {
      slidesById,
      contentItemsById,
    } = yield convertToState(action.meta.deckId, htmlString, assetLinks);

    yield put(fetchDeckSuccess(action.meta.deckId, metadata, slidesById, contentItemsById));
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
