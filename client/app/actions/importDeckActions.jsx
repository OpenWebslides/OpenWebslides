export const SELECT_UPLOAD_FILE = 'SELECT_UPLOAD_FILE';
export const START_UPLOAD = 'START_UPLOAD';
export const ADVANCE_UPLOAD = 'ADVANCE_UPLOAD';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
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
export function selectUploadFile(file) {
  return {
    type: SELECT_UPLOAD_FILE,
    payload: file,
  };
}
