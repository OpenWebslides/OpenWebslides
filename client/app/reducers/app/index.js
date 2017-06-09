import { combineReducers } from 'redux';

import authentication from 'reducers/app/authenticationReducer';
import confirmEmail from 'reducers/app/confirmEmailReducer';
import editor from 'reducers/app/editorReducer';
import feed from 'reducers/app/feedReducer';

const app = combineReducers({
  authentication,
  confirmEmail,
  editor,
  feed,
});

export default app;
