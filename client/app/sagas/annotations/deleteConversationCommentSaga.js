import { takeLatest, call, put } from 'redux-saga/effects';

import { DELETE_CONVERSATION_COMMENT, FETCH_CONVERSATION_COMMENTS } from 'actions/entities/conversation-comments';
import { SIGNOUT } from 'actions/signoutActions';

import deleteConversationCommentApi from 'api/deleteConversationCommentApi';


export function* doDeleteConversationComment(action) {
  try {
    const { conversationCommentId, conversationId } = yield action.meta;

    yield call(deleteConversationCommentApi, conversationCommentId);

    yield put({ type: FETCH_CONVERSATION_COMMENTS, meta: { conversationId } });
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
    }
    console.log(error);
  }
}

function* deleteConversationCommentWatcher() {
  yield takeLatest(DELETE_CONVERSATION_COMMENT, doDeleteConversationComment);
}

export default deleteConversationCommentWatcher;
