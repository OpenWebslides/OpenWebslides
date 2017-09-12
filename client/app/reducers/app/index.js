import { combineReducers } from 'redux';

import authentication from 'reducers/app/authenticationReducer';
import confirmEmail from 'reducers/app/confirmEmailReducer';
import slideEditor from 'reducers/app/slide-editor';
import feed from 'reducers/app/feedReducer';
import annotations from 'reducers/app/annotations';
import deckManagement from 'reducers/app/deckManagementReducer';
import printView from 'reducers/app/printViewReducer';
import userImports from 'reducers/app/userImportsReducer';
import fineUploader from 'reducers/app/fineUploaderReducer';
import presentationView from 'reducers/app/presentationViewReducer';

const app = combineReducers({
  authentication,
  confirmEmail,
  slideEditor,
  feed,
  annotations,
  deckManagement,
  printView,
  userImports,
  fineUploader,
  presentationView,
});

export default app;
