import { combineReducers } from 'redux';

import authentication from 'reducers/app/authenticationReducer';
import confirmEmail from 'reducers/app/confirmEmailReducer';
import slideEditor from 'reducers/app/slide-editor';
import feed from 'reducers/app/feedReducer';
import deckManagement from 'reducers/app/deckManagementReducer';
import presentationView from 'reducers/app/presentationViewReducer';

const app = combineReducers({
  authentication,
  confirmEmail,
  slideEditor,
  feed,
  deckManagement,
  presentationView,
});

export default app;
