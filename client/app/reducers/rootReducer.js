import { combineReducers } from 'redux';

import app from 'reducers/app';
import entities from 'reducers/entities';
import vendor from 'reducers/vendor-reducer';

const rootReducer = combineReducers({
  app,
  entities,
  vendor,
});

export default rootReducer;
