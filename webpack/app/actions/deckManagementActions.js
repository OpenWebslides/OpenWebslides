export const DECK_DELETION_REQUEST = 'DECK_DELETION_REQUEST';
export const DECK_DELETION_REQUEST_SUCCESS = 'DECK_DELETION_REQUEST_SUCCESS';
export const DECK_DELETION_REQUEST_FAILURE = 'DECK_DELETION_REQUEST_FAILURE';
export const DECK_CREATION_REQUEST = 'DECK_CREATION_REQUEST';
export const DECK_CREATION_REQUEST_SUCCESS = 'DECK_CREATION_REQUEST_SUCCESS';
export const DECK_CREATION_REQUEST_FAILURE = 'DECK_CREATION_REQUEST_FAILURE';

export function requestDeckDeletion(deckID) {
  return {
    type: DECK_DELETION_REQUEST,
    meta: deckID,
  };
}
export function requestDeckCreation(info) {
  return {
    type: DECK_CREATION_REQUEST,
    meta: info,
  };
}
export function deckDeletionFailure(message) {
  return {
    type: DECK_DELETION_REQUEST_FAILURE,
    payload: message,
  };
}
export function deckCreationFailure(message) {
  return {
    type: DECK_CREATION_REQUEST_FAILURE,
    payload: message,
  };
}
