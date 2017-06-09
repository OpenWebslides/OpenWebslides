import { combineReducers } from 'redux';

import allIds from 'reducers/entities/decks/allIdsReducer';
import byId from 'reducers/entities/decks/byIdReducer';

const decks = combineReducers({
  allIds,
  byId,
});

export default decks;
