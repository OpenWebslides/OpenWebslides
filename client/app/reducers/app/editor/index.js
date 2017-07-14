import { combineReducers } from 'redux';

import slides from 'reducers/app/editor/slidesReducer';
import contentItems from 'reducers/app/editor/contentItemsReducer';
import activeDeckId from 'reducers/app/editor/activeDeckReducer';
import selectionOffsets from 'reducers/app/editor/selectionReducer';

const editor = combineReducers({
  contentItems,
  slides,
  selectionOffsets,
  activeDeckId,
});

export default editor;
