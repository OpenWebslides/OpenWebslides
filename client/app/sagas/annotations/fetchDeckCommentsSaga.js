/* eslint-disable no-restricted-syntax */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import moment from 'moment';

// Actions
import {
  FETCH_DECK_COMMENTS,
  FETCH_DECK_COMMENTS_SUCCESS,
  FETCH_DECK_COMMENTS_FAILURE,
  FETCH_CONVERSATION_COMMENTS_SUCCESS,
} from 'actions/entities/conversation-comments';
import { FETCH_CONVERSATIONS_SUCCESS } from 'actions/entities/conversations';

import { SIGNOUT } from 'actions/signoutActions';

// API calls
import fetchConversationsApi from 'api/fetchConversationsApi';
import fetchConversationCommentsApi from 'api/fetchConversationCommentsApi';

// Selectors
import { getCurrentUserId } from 'selectors/app/auth';
import { getConversationsById } from 'selectors/entities/conversations';

function conversationsJsonToObjects(conversations, currentUserId) {
  const conversationsPayload = {};

  conversations.data.forEach((conversation) => {
    const {
      id,
      attributes,
      attributes: { deleted },
      relationships,
      meta: { createdAt, commentCount },
    } = conversation;

    const userId = relationships.user.data.id;
    const byCurrentUser = userId === currentUserId;
    const title = deleted ? '(Deleted)' : attributes.title;
    const text = deleted ? 'Conversation has been deleted, comments are still visible.' : attributes.text;
    const createdTimeAgo = moment.unix(createdAt).fromNow();
    const userAttributes = conversations.included.find(user => user.id === userId).attributes;

    conversationsPayload[id] = {
      id,
      commentCount,
      createdTimeAgo,
      text,
      title,
      ...attributes,
      byCurrentUser,
      user: { ...userAttributes },
    };
  });

  return conversationsPayload;
}

function commentsJsonToObjects(comments, currentUserId) {
  const commentObject = {};

  comments.data.forEach((conversationComment) => {
    const { id, attributes, relationships, meta: { createdAt } } = conversationComment;

    const userId = relationships.user.data.id;
    const byCurrentUser = userId === currentUserId;

    const userAttributes = comments.included.find(user => user.id === userId).attributes;
    const createdTimeAgo = moment.unix(createdAt).fromNow();

    commentObject[id] = {
      id,
      ...attributes,
      byCurrentUser,
      user: { ...userAttributes },
      createdTimeAgo };
  });

  return commentObject;
}

export function* doFetchDeckComments(action) {
  try {
    const deckId = action.meta.deckId;

    // First fetch all the conversations
    const conversations = yield call(fetchConversationsApi, deckId);
    const currentUserId = yield select(getCurrentUserId);
    const conversationsPayload = conversationsJsonToObjects(conversations, currentUserId);
    yield put({ type: FETCH_CONVERSATIONS_SUCCESS, payload: conversationsPayload });

    const conversationsObjects = yield select(getConversationsById);
    const conversationsIds = Object.keys(conversationsObjects);

    for (const conversationId of conversationsIds) {
      const conversationComments = yield call(fetchConversationCommentsApi, conversationId);
      const commentsObjects = commentsJsonToObjects(conversationComments, currentUserId);
      yield put({ type: FETCH_CONVERSATION_COMMENTS_SUCCESS, payload: commentsObjects });
    }
  }
  catch (error) {
    console.log(`Could not fetch deck's comments: ${error}`);
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
    }
    yield put({ type: FETCH_DECK_COMMENTS_FAILURE });
  }
}

function* fetchDeckCommentsWatcher() {
  yield takeLatest(FETCH_DECK_COMMENTS, doFetchDeckComments);
}

export default fetchDeckCommentsWatcher;
