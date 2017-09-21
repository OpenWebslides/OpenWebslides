import { takeLatest, put, call } from 'redux-saga/effects';

import {
  FETCH_USER_COLLABORATIONS_SUCCESS,
  FETCH_USER_COLLABORATIONS,
  FETCH_USER_COLLABORATIONS_FAILURE,
} from 'actions/entities/users';
import { SIGNOUT } from 'actions/signoutActions';

import fetchUserCollaborations from 'api/fetchUserCollaborationsApi';

function collaborationJsonToId(collaboration) {
  return parseInt(collaboration.id, 10);
}

export function* fetchUserCollaborationsFlow(action) {
  try {
    const userId = action.meta.userId;
    const responseUserCollaborations = yield call(
      fetchUserCollaborations,
      userId,
    );
    if (!responseUserCollaborations) {
      throw new Error('Received undefined user.');
    }
    const collaborations = responseUserCollaborations.data.map(collaborationJsonToId);
    yield put(
      {
        type: FETCH_USER_COLLABORATIONS_SUCCESS,
        payload: { id: userId, collaborations },
      },
    );
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put({
        type: FETCH_USER_COLLABORATIONS_FAILURE,
        payload: {
          message: 'You are not signed in!',
        },
      });
    }
    else {
      yield put({
        type: FETCH_USER_COLLABORATIONS_FAILURE,
        payload: {
          message: error.message,
        },
      });
    }
  }
}

function* fetchUserCollaborationsWatcher() {
  yield takeLatest(FETCH_USER_COLLABORATIONS, fetchUserCollaborationsFlow);
}

export default fetchUserCollaborationsWatcher;
