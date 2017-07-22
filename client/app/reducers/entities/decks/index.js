import { combineReducers } from 'redux';

import byId from 'reducers/entities/decks/byIdReducer';

const decks = combineReducers({
  byId,
});

export default decks;
