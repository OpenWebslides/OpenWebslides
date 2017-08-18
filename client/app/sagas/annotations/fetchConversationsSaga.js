import { takeLatest, call, put, select } from 'redux-saga/effects';

import {
  FETCH_CONVERSATIONS,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
} from 'actions/entities/conversations';

import { getActiveDeckId } from 'selectors/app/annotations';


import fetchConversationsApi from 'api/fetchConversationsApi';

export function* doFetchConversations() {
  try {
    const deckId = yield select(getActiveDeckId);

    const conversations = yield call(fetchConversationsApi, deckId);

    const payload = {};

    conversations.data.forEach((conversation) => {
      const { id, attributes: { contentItemId, conversationType, text } } = conversation;

      payload[id] = { id, contentItemId, conversationType, text };
    });

    yield put({ type: FETCH_CONVERSATIONS_SUCCESS, payload });
  }
  catch (error) {
    yield put({ type: FETCH_CONVERSATIONS_FAILURE });
  }
}

function* fetchConversationsWatcher() {
  yield takeLatest(FETCH_CONVERSATIONS, doFetchConversations);
}

export default fetchConversationsWatcher;
