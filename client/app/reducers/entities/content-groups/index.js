import { combineReducers } from 'redux';

import byId from 'reducers/entities/content-groups/byIdReducer';

const contentItems = combineReducers({
  byId,
});

export default contentItems;
