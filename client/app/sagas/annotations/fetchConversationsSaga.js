import { takeLatest, call, put, select } from 'redux-saga/effects';
import moment from 'moment';


import {
  FETCH_CONVERSATIONS,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
} from 'actions/entities/conversations';
import { SIGNOUT } from 'actions/signoutActions';

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
      const { id, attributes, attributes: { deleted }, relationships, meta: { createdAt, commentCount } } = conversation;
      const userId = relationships.user.data.id;
      const byCurrentUser = userId === currentUserId;

      const title = deleted ? '(Deleted)' : attributes.title;
      const text = deleted ? 'Conversation has been deleted, comments are still visible.' : attributes.text;
      const createdTimeAgo = moment.unix(createdAt).fromNow();


      const userAttributes = conversations.included.find(user => user.id === userId).attributes;

      payload[id] = { id, commentCount, createdTimeAgo, text, title, ...attributes, byCurrentUser, user: { ...userAttributes } };
    });

    yield put({ type: FETCH_CONVERSATIONS_SUCCESS, payload });
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
    }
    yield put({ type: FETCH_CONVERSATIONS_FAILURE });
  }
}

function* fetchConversationsWatcher() {
  yield takeLatest(FETCH_CONVERSATIONS, doFetchConversations);
}

export default fetchConversationsWatcher;
