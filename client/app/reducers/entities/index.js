import { combineReducers } from 'redux';

import contentBlocks from 'reducers/content-block-reducer';
import decks from 'reducers/deck-reducer';
import slides from 'reducers/slides-reducer';

const entities = combineReducers({
  decks,
  slides,
  contentBlocks,
});

export default entities;
