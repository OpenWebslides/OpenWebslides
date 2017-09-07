import { takeLatest, call, put } from 'redux-saga/effects';

import { RATE_CONVERSATION, RATE_CONVERSATION_SUCCESS } from 'actions/entities/conversations';
import { SIGNOUT } from 'actions/signoutActions';

import rateConversationApi from 'api/rateConversationApi';
import unrateConversationApi from 'api/unrateConversationApi';


export function* doRateConversation(action) {
  try {
    const { conversationId, rated } = yield action.meta;

    let response;

    if (rated) {
      response = yield call(unrateConversationApi, conversationId);
    }
    else {
      response = yield call(rateConversationApi, conversationId);
    }

    const { id, attributes } = yield response;

    yield put({ type: RATE_CONVERSATION_SUCCESS, payload: { id, attributes } });
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put(SIGNOUT);
    }
    console.log(error);
  }
}

function* rateConversationWatcher() {
  yield takeLatest(RATE_CONVERSATION, doRateConversation);
}

export default rateConversationWatcher;
