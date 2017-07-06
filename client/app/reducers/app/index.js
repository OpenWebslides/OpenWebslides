import { combineReducers } from 'redux';

import authentication from 'reducers/app/authenticationReducer';
import confirmEmail from 'reducers/app/confirmEmailReducer';
import slideEditor from 'reducers/app/slide-editor';
import feed from 'reducers/app/feedReducer';
import annotations from 'reducers/app/annotations';
import deckManagement from 'reducers/app/deckManagementReducer';
import userImports from 'reducers/app/userImportsReducer';
import deckImport from 'reducers/app/deckImportReducer';
import presentationView from 'reducers/app/presentationViewReducer';

const app = combineReducers({
  authentication,
  confirmEmail,
  slideEditor,
  feed,
  annotations,
  deckManagement,
  userImports,
  deckImport,
  presentationView,
});

export default app;
