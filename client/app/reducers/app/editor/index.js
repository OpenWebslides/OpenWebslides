import { combineReducers } from 'redux';

import slides from 'reducers/app/editor/slidesReducer';
import contentItems from 'reducers/app/editor/contentItemsReducer';

const editor = combineReducers({
  contentItems,
  slides,
});

export default editor;
