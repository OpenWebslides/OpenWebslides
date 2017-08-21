import { takeLatest, call, put, select } from 'redux-saga/effects';

import {
  FETCH_CONVERSATIONS,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
} from 'actions/entities/conversations';

import { getActiveDeckId } from 'selectors/app/annotations';


import fetchConversationsApi from 'api/fetchConversationsApi';

const mockConversations = {
  1: {
    id: 1,
    contentItemId: '4',
    conversationType: 'question',
    text: 'Is this the only way to do this?',
    user: { firstName: 'Rein', lastName: 'Van Imschoot' },
  },
  2: {
    id: 2,
    contentItemId: '4',
    conversationType: 'note',
    text: 'This is such a great lecture',
    user: { firstName: 'Florian', lastName: 'De Jonckheere' },
  },
  3: {
    id: 3,
    contentItemId: '4',
    conversationType: 'note',
    text: 'I found a better solution',
    user: { firstName: 'Esther', lastName: 'De Loof' },
  },
};

export function* doFetchConversations() {
  try {
    // const deckId = yield select(getActiveDeckId);

    // const conversations = yield call(fetchConversationsApi, deckId);
    // const payload = {};

    // conversations.data.forEach((conversation) => {
    //   const { id, attributes: { contentItemId, conversationType, text }, relationships } = conversation;
    //   const userId = relationships.user.data.id;
    //   const userAttributes = conversations.included.find(user => user.id === userId).attributes;

    //   payload[id] = { id, contentItemId, conversationType, text, user: { ...userAttributes } };
    // });

    yield put({ type: FETCH_CONVERSATIONS_SUCCESS, payload: mockConversations });
  }
  catch (error) {
    yield put({ type: FETCH_CONVERSATIONS_FAILURE });
  }
}

function* fetchConversationsWatcher() {
  yield takeLatest(FETCH_CONVERSATIONS, doFetchConversations);
}

export default fetchConversationsWatcher;
