import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import auth from 'reducers/authReducer';
import confirmEmail from 'reducers/confirmEmailReducer';


const vendor = combineReducers({
  forms,
  routing: routerReducer,

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
