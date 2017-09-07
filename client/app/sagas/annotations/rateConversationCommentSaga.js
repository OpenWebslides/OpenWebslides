import { takeLatest, call, put } from 'redux-saga/effects';

import { RATE_CONVERSATION_COMMENT, RATE_CONVERSATION_COMMENT_SUCCESS } from 'actions/entities/conversation-comments';
import { SIGNOUT } from 'actions/signoutActions';

import rateConversationCommentApi from 'api/rateConversationCommentApi';
import unrateConversationCommentApi from 'api/unrateConversationCommentApi';


export function* doRateConversationComment(action) {
  try {
    const { conversationCommentId, rated } = yield action.meta;

    let response;

    if (rated) {
      response = yield call(unrateConversationCommentApi, conversationCommentId);
    }
    else {
      response = yield call(rateConversationCommentApi, conversationCommentId);
    }

    const { id, attributes } = yield response;

    yield put({ type: RATE_CONVERSATION_COMMENT_SUCCESS, payload: { id, attributes } });
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put(SIGNOUT);
    }
    console.log(error);
  }
}

function* rateConversationCommentWatcher() {
  yield takeLatest(RATE_CONVERSATION_COMMENT, doRateConversationComment);
}

export default rateConversationCommentWatcher;
