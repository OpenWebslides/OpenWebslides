import { takeLatest, select, call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { getActiveDeckId } from 'selectors/app/annotations';
import { getActiveSlideId } from 'selectors/app/presentation';
import { getCurrentUserId } from 'selectors/app/auth';
import { ADD_CONVERSATION } from 'actions/entities/conversations';
import { SIGNOUT } from 'actions/signoutActions';

import createConversationApi from 'api/createConversationApi';


export function* doAddConversation(action) {
  const { resolve, reject } = action.meta;

  try {
    const contentItemId = yield select(getActiveSlideId);
    const deckId = yield select(getActiveDeckId);
    const userId = yield select(getCurrentUserId);
    const { title, text, conversationType } = action.meta.values;

    const response = yield call(createConversationApi, { deckId, contentItemId, title, text, conversationType, userId });

    console.log(response);

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

function* fetchConversationsWatcher() {
  yield takeLatest(ADD_CONVERSATION, doAddConversation);
}

export default fetchConversationsWatcher;
