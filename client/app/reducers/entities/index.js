import { combineReducers } from 'redux';

import contentItems from 'reducers/entities/content-items';
import decks from 'reducers/entities/decks';
import slides from 'reducers/entities/slides';

const entities = combineReducers({
  decks,
  slides,
  contentItems,
});

export default entities;
