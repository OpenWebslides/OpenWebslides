import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import client from './modules/client/reducer';
import signUp from './modules/sign_up/reducer';

const IndexReducer = combineReducers({
  client,
  signUp,
  form,
});

export default IndexReducer;
