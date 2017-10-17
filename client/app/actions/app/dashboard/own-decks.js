export const OWN_DECKS_REQUESTS_START = 'OWN_DECKS_REQUESTS_START';
export const OWN_DECKS_REQUESTS_FAILURE = 'OWN_DECKS_REQUESTS_FAILURE';
export const OWN_DECKS_REQUESTS_SUCCESS = 'OWN_DECKS_REQUESTS_SUCCESS';

export const OWN_DECK_DELETION_REQUEST = 'OWN_DECK_DELETION_REQUEST';
export const OWN_DECK_DELETION_REQUEST_SUCCESS = 'OWN_DECK_DELETION_REQUEST_SUCCESS';
export const OWN_DECK_DELETION_REQUEST_FAILURE = 'OWN_DECK_DELETION_REQUEST_FAILURE';


export function ownDecksRequestsStart(userId) {
  return {
    type: OWN_DECKS_REQUESTS_START,
    payload: userId,
  };
}

export function ownDeckDeletionRequest(deckId) {
  return {
    type: OWN_DECK_DELETION_REQUEST,
    meta: deckId,
  };
}
