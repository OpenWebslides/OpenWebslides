export const REQUEST_DECK_LIST = 'REQUEST_DECK_LIST';
export const REQUEST_DECK_LIST_SUCCESS = 'REQUEST_DECK_LIST_SUCCESS';
export const REQUEST_DECK_LIST_FAILURE = 'REQUEST_DECK_LIST_FAILURE';
export const DECK_DELETION_REQUEST = 'DECK_DELETION_REQUEST';
export const DECK_DELETION_REQUEST_SUCCESS = 'DECK_DELETION_REQUEST_SUCCESS';
export const DECK_DELETION_REQUEST_FAILURE = 'DECK_DELETION_REQUEST_FAILURE';

export function requestDeckDeletion(deckID) {
  return {
    type: DECK_DELETION_REQUEST,
    meta: deckID,
  };
}

export function deckDeletionFailure(message) {
  return {
    type: DECK_DELETION_REQUEST_FAILURE,
    payload: message,
  };
}

export function requestOwnDecks(userID) {
  return {
    type: DECK_DELETION_REQUEST,
    meta: userID,
  };
}
