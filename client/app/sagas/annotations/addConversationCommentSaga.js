import { takeLatest, select, call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { getActiveSlideId, getActiveDeckId, getActiveConversationId } from 'selectors/app/annotations';
import { getCurrentUserId } from 'selectors/app/auth';
import { ADD_CONVERSATION_COMMENT, FETCH_CONVERSATION_COMMENTS } from 'actions/entities/conversation-comments';
import { SIGNOUT } from 'actions/signoutActions';

import createConversationCommentApi from 'api/createConversationCommentApi';


export function* doAddConversationComment(action) {
  const { resolve, reject } = action.meta;

  try {
    const contentItemId = yield select(getActiveSlideId);
    const deckId = yield select(getActiveDeckId);
    const userId = yield select(getCurrentUserId);
    const conversationId = yield select(getActiveConversationId);
    const { text } = action.meta.values;

    yield call(createConversationCommentApi, { deckId, contentItemId, conversationId, text, userId });

    yield put({ type: FETCH_CONVERSATION_COMMENTS, meta: { conversationId } });
    yield call(resolve);
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({type: SIGNOUT});
    }
    const errorMessage = yield { _error: 'Something went wrong on our end.' };
    yield call(reject, new SubmissionError(errorMessage));
  }
}

function* fetchConversationsWatcher() {
  yield takeLatest(ADD_CONVERSATION_COMMENT, doAddConversationComment);
}

export default fetchConversationsWatcher;
