import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';

import auth from 'reducers/auth';
import confirmEmail from 'reducers/confirmEmail';

const vendor = combineReducers({
  forms,
});

const local = combineReducers({
  auth,
  confirmEmail,
});

const rootReducer = combineReducers({
  vendor,
  local,
});

export default rootReducer;
