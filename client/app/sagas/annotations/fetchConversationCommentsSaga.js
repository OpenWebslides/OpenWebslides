import { takeLatest, call, put, select } from 'redux-saga/effects';
import moment from 'moment';


import {
  FETCH_CONVERSATION_COMMENTS,
  FETCH_CONVERSATION_COMMENTS_SUCCESS,
  FETCH_CONVERSATION_COMMENTS_FAILURE,
} from 'actions/entities/conversation-comments';

import fetchConversationCommentsApi from 'api/fetchConversationCommentsApi';
import { getCurrentUserId } from 'selectors/app/auth';


const mockConversationComments = {
  1: {
    id: 1,
    rating: 24,
    rated: false,
    text: 'Dude! me neither!!!!! We should ask Esther for help',
    user: {
      firstName: 'Florian',
      lastName: 'De Jonckheere',
    },
    createdAt: moment.unix(1503322709).fromNow(),
  },
  2: {
    id: 2,
    rating: 900,
    edited: true,
    rated: false,
    text: 'LOL, you dont srsly think I will help you? You never pay attention in class',
    user: {
      firstName: 'Esther',
      lastName: 'De Loof',
    },
    createdAt: moment.unix(1503322709).fromNow(),
  },
  3: {
    id: 3,
    rating: 24,
    deleted: true,
    rated: false,
    text: 'Pleaaaaseeeeeeeeeee :(((((',
    user: {
      firstName: 'Florian',
      lastName: 'De Jonckheere',
    },
    createdAt: moment.unix(1503322709).fromNow(),
  },
  4: {
    id: 4,
    rating: 240,
    rated: false,
    text: 'It suddenly all makes sense!',
    user: {
      firstName: 'Rein',
      lastName: 'Van Imschoot',
    },
    createdAt: moment.unix(1503322709).fromNow(),
  },
};

export function* doFetchConversations(action) {
  try {
    const { conversationId } = action.meta;
    const currentUserId = yield select(getCurrentUserId);


    const conversationComments = yield call(fetchConversationCommentsApi, conversationId);
    const payload = {};

    conversationComments.data.forEach((conversationComment) => {
      const { id, attributes, relationships, meta: { createdAt } } = conversationComment;

      const userId = relationships.user.data.id;
      const byCurrentUser = userId === currentUserId;

      const userAttributes = conversationComments.included.find(user => user.id === userId).attributes;
      const createdTimeAgo = moment.unix(createdAt).fromNow();

      payload[id] = { id, ...attributes, byCurrentUser, user: { ...userAttributes }, createdTimeAgo };
    });

    yield put({ type: FETCH_CONVERSATION_COMMENTS_SUCCESS, payload });
  }
  catch (error) {
    yield put({ type: FETCH_CONVERSATION_COMMENTS_FAILURE });
  }
}

function* fetchConversationsWatcher() {
  yield takeLatest(FETCH_CONVERSATION_COMMENTS, doFetchConversations);
}

export default fetchConversationsWatcher;
