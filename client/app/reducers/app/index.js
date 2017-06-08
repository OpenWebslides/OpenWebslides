import { combineReducers } from 'redux';

import authentication from 'reducers/app/auth-reducer';
import confirmEmail from 'reducers/app/confirm-email-reducer';
import editor from 'reducers/app/editor-reducer';
import feed from 'reducers/app/feed-reducer';

const app = combineReducers({
  authentication,
  confirmEmail,
  editor,
  feed,
});

export default app;
