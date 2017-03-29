import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import client from './modules/client/reducer';
import signup from './modules/signup/reducer';
import signin from './modules/signin/reducer';

const IndexReducer = combineReducers({
  client,
  signup,
  form,
  signin,
});

export default IndexReducer;
