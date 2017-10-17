import { takeLatest, put, call, select } from 'redux-saga/effects';

import { SIGNOUT } from 'actions/signoutActions';
import {
  OWN_COLLABORATIONS_REQUESTS_START,
  OWN_COLLABORATIONS_REQUESTS_FAILURE,
  OWN_COLLABORATIONS_REQUESTS_SUCCESS,
} from 'actions/app/dashboard/own-collaborations';

// other sagas:
import { fetchUserFlow } from 'sagas/entities/users/fetchUserSaga';
import { fetchDeckMetadataFlow } from 'sagas/entities/decks/fetchDeckMetadataSaga';
import { fetchUserCollaborationsFlow } from 'sagas/entities/users/fetchUserCollaborationsSaga';

// Selectors:
import { getUserCollaborationsIds } from 'selectors/entities/users';

export function* ownCollaborationsRequestsFlow(action) {
  try {
    yield call(fetchUserFlow, action.payload);
    yield call(fetchUserCollaborationsFlow, action.payload);

    const collaborationsIds = yield select(getUserCollaborationsIds, action.payload);
    for (let i = 0; i < collaborationsIds.length; i += 1) {
      // Note to future refactorer:
      // We need a traditional loop because of limitation on `yield`, don't try using .foreach
      const contributionId = collaborationsIds[i];
      yield call(fetchDeckMetadataFlow, contributionId);
    }
  }
  catch (error) {
    if (error.statusCode === 401) {
      yield put({ type: SIGNOUT });
      yield put({
        type: OWN_COLLABORATIONS_REQUESTS_FAILURE,
        payload: {
          message: 'You are not signed in!',
        },
      });
    }
    else {
      yield put({
        type: OWN_COLLABORATIONS_REQUESTS_FAILURE,
        payload: {
          message: error.message,
        },
      });
    }
  }

  yield put({ type: OWN_COLLABORATIONS_REQUESTS_SUCCESS });
}

function* ownCollaborationsRequestsWatcher() {
  yield takeLatest(OWN_COLLABORATIONS_REQUESTS_START, ownCollaborationsRequestsFlow);
}

export default ownCollaborationsRequestsWatcher;
