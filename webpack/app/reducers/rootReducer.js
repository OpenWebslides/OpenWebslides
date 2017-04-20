import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import signup from './signupReducer';
import signin from './signinReducer';

const rootReducer = combineReducers({
  vendor: {
    form,
  },
  data: {
    signup,
    signin,
  },
});

export default rootReducer;
