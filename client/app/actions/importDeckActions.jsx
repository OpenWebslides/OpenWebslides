export const SELECT_UPLOAD_FILE = 'SELECT_UPLOAD_FILE';
export const START_UPLOAD = 'START_UPLOAD';
export const ADVANCE_UPLOAD = 'ADVANCE_UPLOAD';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const IMPORT_STARTED = 'IMPORT_STARTED';
export const DECK_IMPORT_REQUEST_SUCCESS = 'DECK_IMPORT_REQUEST_SUCCESS';
export const DECK_IMPORT_REQUEST_FAILURE = 'DECK_IMPORT_REQUEST_FAILURE';

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
export function uploadFailure(message) {
  return {
    type: UPLOAD_FAILURE,
    payload: message,
  };
}
