import { combineReducers } from 'redux';

import byId from 'reducers/entities/content-blocks/byIdReducer';

const contentBlocks = combineReducers({
  byId,
});

export default contentBlocks;
