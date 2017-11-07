import { combineReducers } from 'redux';

import authentication from 'reducers/app/authenticationReducer';
import confirmEmail from 'reducers/app/confirmEmailReducer';
import slideEditor from 'reducers/app/slide-editor';
import feed from 'reducers/app/feedReducer';
import annotations from 'reducers/app/annotations';
import printView from 'reducers/app/printViewReducer';
import userImports from 'reducers/app/userImportsReducer';
import fineUploader from 'reducers/app/fineUploaderReducer';
import presentationView from 'reducers/app/presentationViewReducer';
import profilePage from 'reducers/app/profile-page';
import ownDecks from 'reducers/app/own-decks';
import ownCollaborations from 'reducers/app/own-collaborations';
import courseNotePanel from 'reducers/app/courseNotePanelReducer';


const app = combineReducers({
  authentication,
  confirmEmail,
  slideEditor,
  feed,
  annotations,
  printView,
  userImports,
  fineUploader,
  presentationView,
  profilePage,
  ownDecks,
  ownCollaborations,
  courseNotePanel,
});

export default app;
