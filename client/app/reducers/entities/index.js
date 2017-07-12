import { combineReducers } from 'redux';

import contentGroups from 'reducers/entities/content-groups';
import decks from 'reducers/entities/decks';
import slides from 'reducers/entities/slides';

const entities = combineReducers({
  decks,
  slides,
  contentGroups,
});

export default entities;
