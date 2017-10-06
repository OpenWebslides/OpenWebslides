import Immutable from 'seamless-immutable';
import {
  OWN_DECKS_START_REQUESTS,
  OWN_DECKS_REQUESTS_FAILURE,
  OWN_DECKS_REQUESTS_SUCCESS,
  REQUEST_OWN_DECK_DELETION_FAILURE,
} from 'actions/app/dashboard/own-decks';

const initialState = Immutable({
  startedRequests: false,
  requestsSucceeded: false,
  errorMessage: '',
  deckDeletionErrors: [],
});


function ownDecksReducer(state = initialState, action) {
  switch (action.type) {
    case OWN_DECKS_START_REQUESTS:
      return Immutable.merge(state, { startedRequests: true, requestsSucceeded: false });
    case OWN_DECKS_REQUESTS_FAILURE:
      return Immutable.merge(state, { startedRequests: false,
        requestsSucceeded: false,
        errorMessage: action.payload.message });
    case OWN_DECKS_REQUESTS_SUCCESS:
      return Immutable.merge(state, { startedRequests: false, requestsSucceeded: true });
    case REQUEST_OWN_DECK_DELETION_FAILURE:
      return Immutable.merge(state, { deckDeletionErrors: state.deckDeletionErrors.concat(action.payload) });
    default:
      return state;
  }
}

export default ownDecksReducer;
