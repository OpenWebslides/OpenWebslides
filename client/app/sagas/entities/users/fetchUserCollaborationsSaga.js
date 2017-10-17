import { put, call } from 'redux-saga/effects';

import { setUserCollaborations } from 'actions/entities/users';

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
    throw new Error('Received undefined list of collaborations.');
  }
  const collaborations = responseUserCollaborations.data.map(collaborationJsonToId);
  yield put(setUserCollaborations(userId, collaborations));
}

export default fetchUserCollaborationsFlow;
