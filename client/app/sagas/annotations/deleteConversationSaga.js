import { takeLatest, call, put } from 'redux-saga/effects';

import { DELETE_CONVERSATION, FETCH_CONVERSATIONS } from 'actions/entities/conversations';
import deleteConversationApi from 'api/deleteConversationApi';


export function* doDeleteConversation(action) {
  try {
    const { conversationId } = yield action.meta;

    yield call(deleteConversationApi, conversationId);

    yield put({ type: FETCH_CONVERSATIONS });
  }
  catch (error) {
    console.log(error);
  }
}

function* deleteConversationWatcher() {
  yield takeLatest(DELETE_CONVERSATION, doDeleteConversation);
}

export default deleteConversationWatcher;
