import Immutable from 'seamless-immutable';
import {
  OWN_COLLABORATIONS_START_REQUESTS,
  OWN_COLLABORATIONS_REQUESTS_FAILURE,
  OWN_COLLABORATIONS_REQUESTS_SUCCESS,
} from 'actions/app/dashboard/own-collaborations';

const initialState = Immutable({
  startedRequests: false,
  requestsSucceeded: false,
  errorMessage: '',
});


function ownDecksReducer(state = initialState, action) {
  switch (action.type) {
    case OWN_COLLABORATIONS_START_REQUESTS:
      return Immutable.merge(state, { startedRequests: true, requestsSucceeded: false });
    case OWN_COLLABORATIONS_REQUESTS_FAILURE:
      return Immutable.merge(state, { startedRequests: false,
        requestsSucceeded: false,
        errorMessage: action.payload.message });
    case OWN_COLLABORATIONS_REQUESTS_SUCCESS:
      return Immutable.merge(state, { startedRequests: false, requestsSucceeded: true });
    default:
      return state;
  }
}

export default ownDecksReducer;
