import { combineReducers } from 'redux';

import byId from 'reducers/entities/content-items/byIdReducer';

const contentItems = combineReducers({
  byId,
});

export default contentItems;
