import { combineReducers } from 'redux';

import contentItems from 'reducers/entities/content-items';
import decks from 'reducers/entities/decks';
import slides from 'reducers/entities/slides';
import conversations from 'reducers/entities/conversations';

const entities = combineReducers({
  decks,
  slides,
  contentItems,
  conversations,
});

export default entities;
