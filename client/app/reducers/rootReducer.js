import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';

import auth from 'reducers/authReducer';
import confirmEmail from 'reducers/confirmEmailReducer';

import feed from './feedReducer';

const vendor = combineReducers({
  forms,
});

const local = combineReducers({
  auth,
  confirmEmail,
  feed,
});

const rootReducer = combineReducers({
  vendor,
  local,
});

export default rootReducer;
