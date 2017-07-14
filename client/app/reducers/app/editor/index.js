import { combineReducers } from 'redux';

import slides from 'reducers/app/editor/slidesReducer';
import contentItems from 'reducers/app/editor/contentItemsReducer';
import activeDeck from 'reducers/app/editor/activeDeckReducer';
import selection from 'reducers/app/editor/selectionReducer';

const editor = combineReducers({
  contentItems,
  slides,
  selection,
  activeDeck,
});

export default editor;
