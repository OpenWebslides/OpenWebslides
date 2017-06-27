import { combineReducers } from 'redux';

import authentication from 'reducers/app/authenticationReducer';
import confirmEmail from 'reducers/app/confirmEmailReducer';
import editor from 'reducers/app/editor';
import feed from 'reducers/app/feedReducer';
import deckManagement from 'reducers/app/deckManagementReducer';

const app = combineReducers({
  authentication,
  confirmEmail,
  editor,
  feed,
  deckManagement,
});

export default app;
