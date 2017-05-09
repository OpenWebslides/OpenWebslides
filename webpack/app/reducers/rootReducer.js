import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';

import auth from 'reducers/authReducer';
import confirmEmail from 'reducers/confirmEmailReducer';

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
