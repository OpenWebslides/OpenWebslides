import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';

import app from 'reducers/app';
import entities from 'reducers/entities';
import vendor from 'reducers/vendorReducer';

const rootReducer = combineReducers({
  app,
  entities,
  vendor,
});

export default rootReducer;
