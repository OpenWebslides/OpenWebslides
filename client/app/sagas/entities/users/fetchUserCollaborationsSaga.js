import { put, call } from 'redux-saga/effects';

import { FETCH_USER_COLLABORATIONS_SUCCESS } from 'actions/entities/users';

import fetchUserCollaborations from 'api/fetchUserCollaborationsApi';

function collaborationJsonToId(collaboration) {
  return parseInt(collaboration.id, 10);
}

export function* fetchUserCollaborationsFlow(userId) {
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

