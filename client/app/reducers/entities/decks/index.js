import { combineReducers } from 'redux';

import allIds from 'reducers/entities/decks/all-ids-reducer';
import byId from 'reducers/entities/decks/by-id-reducer';

const decks = combineReducers({
  allIds,
  byId,
});

export default decks;
