import { takeLatest, call, put, select } from 'redux-saga/effects';

import {
  FETCH_CONVERSATIONS,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
} from 'actions/entities/conversations';

import { getActiveDeckId } from 'selectors/app/annotations';
import { getCurrentUserId } from 'selectors/app/auth';

import fetchConversationsApi from 'api/fetchConversationsApi';

const mockConversations = {
  1: {
    id: 1,
    contentItemId: '4',
    conversationType: 'question',
    text: 'I dont understand shit of this slide! Like, who is Ruben?? What are webslides????? God, this is HURTING MY BRAAAAINNNNN',
    user: {
      firstName: 'Rein',
      lastName: 'Van Imschoot',
    },
  },
};

export function* doFetchConversations() {
  try {
    const deckId = yield select(getActiveDeckId);
    const currentUserId = yield select(getCurrentUserId);

    const conversations = yield call(fetchConversationsApi, deckId);
    const payload = {};

    conversations.data.forEach((conversation) => {
      const { id, attributes, relationships } = conversation;
      const userId = relationships.user.data.id;
      const byCurrentUser = userId === currentUserId;

      const userAttributes = conversations.included.find(user => user.id === userId).attributes;

      payload[id] = { id, ...attributes, byCurrentUser, user: { ...userAttributes } };
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
