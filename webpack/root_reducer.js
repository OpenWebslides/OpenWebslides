import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import signup from './modules/signup/reducer';
import signin from './modules/signin/reducer';

const rootReducer = combineReducers({
  form, // Makes redux-forms part of the state
  signup,
  signin,
});

export default rootReducer;
