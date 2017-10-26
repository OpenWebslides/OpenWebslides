import { takeLatest, call, select, put } from 'redux-saga/effects';
import updateDeckApi from 'api/updateDeckApi';

import convertDeckToHtmlString from 'lib/convert-to-htmlstring/convertDeckToHtmlString';

import { UPDATE_DECK, updateDeckSuccess } from 'actions/entities/decks';
import { SIGNOUT } from 'actions/signoutActions';

import { getActiveDeckId } from 'selectors/app/slide-editor';
import { getDeckById } from 'selectors/entities/decks';

function* doUpdateDeck() {
  try {
    const activeDeckId = yield select(getActiveDeckId);
    const deck = yield select(getDeckById, activeDeckId);
    const htmlString = convertDeckToHtmlString(deck);

    yield call(updateDeckApi, deck.id, htmlString);
    yield put(updateDeckSuccess());
  }
  catch (e) {
    if (e.statusCode === 401) {
      yield put({ type: SIGNOUT });
    }
    console.log(e);
  }
}

function* updateDeckWatcher() {
  yield takeLatest(UPDATE_DECK, doUpdateDeck);
}

export default updateDeckWatcher;
