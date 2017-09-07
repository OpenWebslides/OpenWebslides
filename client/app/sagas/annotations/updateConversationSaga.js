import { takeLatest, call, select, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import {
  UPDATE_CONVERSATION,
  UPDATE_CONVERSATION_SUCCESS,
} from 'actions/entities/conversations';
import { UNSET_IS_EDITING_CONVERSATION } from 'actions/app/annotations';
import { SIGNOUT } from 'actions/signoutActions';

import updateConversationApi from 'api/updateConversationApi';
import { getActiveConversationId } from 'selectors/app/annotations';


export function* doUpdateConversation(action) {
  const { resolve, reject } = action.meta;

  try {
    const { text, title } = action.meta.values;
    const conversationId = yield select(getActiveConversationId);

    const response = yield call(updateConversationApi, { conversationId, text, title });

    const { id, attributes } = yield response.data;

    yield put({ type: UPDATE_CONVERSATION_SUCCESS, payload: { id, attributes } });
    yield put({ type: UNSET_IS_EDITING_CONVERSATION });

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

function* updateConversationWatcher() {
  yield takeLatest(UPDATE_CONVERSATION, doUpdateConversation);
}

export default updateConversationWatcher;
