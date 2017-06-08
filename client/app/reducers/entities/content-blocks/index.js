import { combineReducers } from 'redux';

import byId from 'reducers/entities/content-blocks/by-id-reducer';

const contentBlocks = combineReducers({
  byId,
});

export default contentBlocks;
