import { combineReducers } from 'redux';

import byId from 'reducers/entities/slides/byIdReducer';

const slides = combineReducers({
  byId,
});

export default slides;
