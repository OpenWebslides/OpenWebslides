import Immutable from 'seamless-immutable';

import {
  SELECT_UPLOAD_FILE,
  START_UPLOAD,
  ADVANCE_UPLOAD,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS,
  DECK_IMPORT_REQUEST,
  DECK_IMPORT_REQUEST_SUCCESS,
  DECK_IMPORT_REQUEST_FAILURE,
} from 'actions/importDeckActions';

const initialState = Immutable({
  selectedFile: '',
  uploadStarted: false,
  uploadPercent: 0,
  uploadErrorMessage: '',
  uploadSucceeded: false,
  importStarted: false,
  importSucceeded: false,
  importError: '',
});

function deckImportReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_UPLOAD_FILE:
      return Immutable.merge(state, {
        selectedFile: action.payload,
        uploadStarted: false,
        uploadPercent: 0,
      });
    case START_UPLOAD:
      return Immutable.merge(state, {
        uploadStarted: true,
        uploadPercent: 0,
      });
    case ADVANCE_UPLOAD:
      return Immutable.merge(state, {
        uploadStarted: true,
        uploadPercent: action.payload,
      });
    case UPLOAD_FAILURE:
      return Immutable.merge(state, {
        uploadStarted: false,
        uploadPercent: 0,
        uploadErrorMessage: action.payload,
      });
    case UPLOAD_SUCCESS:
      return Immutable.merge(state, {
        uploadStarted: false,
        uploadPercent: 0,
        uploadErrorMessage: '',
        uploadSuccess: true,
      });
    case DECK_IMPORT_REQUEST:
      return Immutable.merge(state, {
        importStarted: true,
        importSucceeded: false,
        importError: '',
      });
    case DECK_IMPORT_REQUEST_SUCCESS:
      return Immutable.merge(state, {
        importStarted: false,
        importSucceeded: true,
        importError: '',
      });
    case DECK_IMPORT_REQUEST_FAILURE:
      return Immutable.merge(state, {
        importStarted: false,
        importSucceeded: false,
        importError: action.payload,
      });

    default:
      return state;
  }
}

export default deckImportReducer;
