import Immutable from 'seamless-immutable';
import {
  OWN_DECKS_REQUESTS_START,
  OWN_DECKS_REQUESTS_FAILURE,
  OWN_DECKS_REQUESTS_SUCCESS,
  OWN_DECK_DELETION_REQUEST_START,
  OWN_DECK_DELETION_REQUEST_SUCCESS,
  OWN_DECK_DELETION_REQUEST_FAILURE,
} from 'actions/app/dashboard/own-decks';

const initialState = Immutable({
  requestsStarted: false,
  requestsSucceeded: false,
  errorMessage: '',
  deckDeletionRequested: [],
  deckDeletionErrors: {},
});

function ownDecksRequestsStart(state) {
  return Immutable.merge(state, { requestsStarted: true, requestsSucceeded: false });
}

function ownDecksRequestsFailure(state, action) {
  return Immutable.merge(state, { requestsStarted: false,
    requestsSucceeded: false,
    errorMessage: action.payload.message });
}

function ownDecksRequestsSuccess(state) {
  return Immutable.merge(state, { requestsStarted: false, requestsSucceeded: true });
}

function ownDeckDeletionRequestStart(state, action) {
  const newRequests = state.deckDeletionRequested.concat(action.payload);
  return Immutable.merge(state, { deckDeletionRequested: newRequests });
}

function ownDeckDeletionRequestSuccess(state, action) {
  const newRequests = state.deckDeletionRequested.concat().filter(i => i !== action.payload);
  return Immutable.merge(state, { deckDeletionRequested: newRequests });
}

function ownDeckDeletionRequestFailure(state, action) {
  const newDeckDeletionErrors = {
    ...state.deckDeletionErrors,
    [action.deckId]: action.payload.errorMessage,
  };
  return Immutable.merge(state, { deckDeletionErrors: newDeckDeletionErrors });
}


function ownDecksReducer(state = initialState, action) {
  switch (action.type) {
    case OWN_DECKS_REQUESTS_START: return ownDecksRequestsStart(state);
    case OWN_DECKS_REQUESTS_FAILURE: return ownDecksRequestsFailure(state, action);
    case OWN_DECKS_REQUESTS_SUCCESS: return ownDecksRequestsSuccess(state);
    case OWN_DECK_DELETION_REQUEST_START: return ownDeckDeletionRequestStart(state, action);
    case OWN_DECK_DELETION_REQUEST_SUCCESS: return ownDeckDeletionRequestSuccess(state, action);
    case OWN_DECK_DELETION_REQUEST_FAILURE: return ownDeckDeletionRequestFailure(state, action);
    default:
      return state;
  }
}

export default ownDecksReducer;
