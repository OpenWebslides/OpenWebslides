import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import client from './modules/client/reducer';
import signup from './modules/signup/reducer';

const IndexReducer = combineReducers({
  client,
  signup,
  form,
});

export default IndexReducer;
