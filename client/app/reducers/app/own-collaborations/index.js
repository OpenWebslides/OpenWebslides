import Immutable from 'seamless-immutable';
import {
  OWN_COLLABORATIONS_START_REQUESTS,
  OWN_COLLABORATIONS_REQUESTS_FAILURE,
  OWN_COLLABORATIONS_REQUESTS_SUCCESS,
} from 'actions/app/dashboard/own-collaborations';

const initialState = Immutable({
  requestsStatus: 'notStarted',
  errorMessage: '',
});


function ownDecksReducer(state = initialState, action) {
  switch (action.type) {
    case OWN_COLLABORATIONS_START_REQUESTS:
      return Immutable.merge(state, { requestsStatus: 'pending' });
    case OWN_COLLABORATIONS_REQUESTS_FAILURE:
      return Immutable.merge(state, { requestsStatus: 'failed',
        errorMessage: action.payload.message });
    case OWN_COLLABORATIONS_REQUESTS_SUCCESS:
      return Immutable.merge(state, { requestsStatus: 'succeeded' });
    default:
      return state;
  }
}

export default ownDecksReducer;
