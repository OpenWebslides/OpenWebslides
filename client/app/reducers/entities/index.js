import { combineReducers } from 'redux';

import contentBlocks from 'reducers/entities/content-blocks';
import decks from 'reducers/entities/decks';
import slides from 'reducers/entities/slides';

const entities = combineReducers({
  decks,
  slides,
  contentBlocks,
});

export default entities;
