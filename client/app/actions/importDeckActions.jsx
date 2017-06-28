export const DECK_IMPORT_REQUEST = 'DECK_IMPORT_REQUEST';
export const DECK_IMPORT_REQUEST_SUCCESS = 'DECK_IMPORT_REQUEST_SUCCESS';
export const DECK_IMPORT_REQUEST_FAILURE = 'DECK_IMPORT_REQUEST_FAILURE';

export function requestDeckImport(info) {
  return {
    type: DECK_IMPORT_REQUEST,
    meta: info,
  };
}

export function deckImportFailure(message) {
  return {
    type: DECK_IMPORT_REQUEST_FAILURE,
    payload: message,
  };
}
