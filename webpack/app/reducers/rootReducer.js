import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';

import auth from './signinReducer';

const vendor = combineReducers({
  forms,
});

const local = combineReducers({
  auth,
});

const rootReducer = combineReducers({
  vendor,
  local,
});

export default rootReducer;
