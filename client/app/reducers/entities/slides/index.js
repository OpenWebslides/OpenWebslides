import { combineReducers } from 'redux';

import allIds from 'reducers/entities/slides/allIdsReducer';
import byId from 'reducers/entities/slides/byIdReducer';

const slides = combineReducers({
  allIds,
  byId,
});

export default slides;
