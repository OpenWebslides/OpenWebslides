import Immutable from 'seamless-immutable';
import {
  OWN_COLLABORATIONS_REQUESTS_START,
  OWN_COLLABORATIONS_REQUESTS_FAILURE,
  OWN_COLLABORATIONS_REQUESTS_SUCCESS,
} from 'actions/app/dashboard/own-collaborations';

const initialState = Immutable({
  requestsStatus: 'notStarted',
  errorMessage: '',
});

function ownCollaborationsRequestsStart(state) {
  return Immutable.merge(state, { requestsStatus: 'pending' });
}

function ownCollaborationsRequestsFailure(state, action) {
  return Immutable.merge(state, { requestsStatus: 'failed',
    errorMessage: action.payload.message });
}

function ownCollaborationsRequestsSuccess(state) {
  return Immutable.merge(state, { requestsStatus: 'succeeded' });
}

function ownDecksReducer(state = initialState, action) {
  switch (action.type) {
    case OWN_COLLABORATIONS_REQUESTS_START: return ownCollaborationsRequestsStart(state);
    case OWN_COLLABORATIONS_REQUESTS_FAILURE: return ownCollaborationsRequestsFailure(state, action);
    case OWN_COLLABORATIONS_REQUESTS_SUCCESS: return ownCollaborationsRequestsSuccess(state);
    default: return state;
  }
}

export default ownDecksReducer;
