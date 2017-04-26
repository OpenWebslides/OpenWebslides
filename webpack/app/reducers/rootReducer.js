import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import auth from 'reducers/authReducer';

const vendor = combineReducers({
  forms,
  routing: routerReducer,

});

const local = combineReducers({
  auth,
});

const rootReducer = combineReducers({
  vendor,
  local,
});

export default rootReducer;
