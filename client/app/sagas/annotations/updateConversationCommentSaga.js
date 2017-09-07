import { takeLatest, call, select, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import {
  UPDATE_CONVERSATION_COMMENT,
  UPDATE_CONVERSATION_COMMENT_SUCCESS,
} from 'actions/entities/conversation-comments';
import { UNSET_EDITABLE_CONVERSATION_COMMENT } from 'actions/app/annotations';
import { SIGNOUT } from 'actions/signoutActions';

import updateConversationCommentApi from 'api/updateConversationCommentApi';
import { getEditableConversationCommentId } from 'selectors/app/annotations';


export function* doUpdateConversation(action) {
  const { resolve, reject } = action.meta;

  try {
    const { text } = action.meta.values;
    const conversationCommentId = yield select(getEditableConversationCommentId);

    const response = yield call(updateConversationCommentApi, { conversationCommentId, text });

    const { id, attributes } = yield response.data;

    yield put({ type: UPDATE_CONVERSATION_COMMENT_SUCCESS, payload: { id, attributes } });
    yield put({ type: UNSET_EDITABLE_CONVERSATION_COMMENT });

    yield call(resolve);
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
    }
    const errorMessage = yield { _error: 'Something went wrong on our end.' };
    yield call(reject, new SubmissionError(errorMessage));
  }
}

function* updateConversationCommentWatcher() {
  yield takeLatest(UPDATE_CONVERSATION_COMMENT, doUpdateConversation);
}

export default updateConversationCommentWatcher;
