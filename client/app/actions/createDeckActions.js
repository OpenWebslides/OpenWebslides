export const DECK_CREATION_REQUEST = 'DECK_CREATION_REQUEST';
export const DECK_CREATION_REQUEST_SUCCESS = 'DECK_CREATION_REQUEST_SUCCESS';
export const DECK_CREATION_REQUEST_FAILURE = 'DECK_CREATION_REQUEST_FAILURE';

export function requestDeckCreation(info) {
  return {
    type: DECK_CREATION_REQUEST,
    meta: info,
  };
}

export function deckCreationFailure(message) {
  return {
    type: DECK_CREATION_REQUEST_FAILURE,
    payload: message,
  };
}
