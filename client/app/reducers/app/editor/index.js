import { combineReducers } from 'redux';

import contentBlocks from 'reducers/app/editor/contentBlocksReducer';
import slides from 'reducers/app/editor/slidesReducer';
import contentGroups from 'reducers/app/editor/contentGroupsReducer';

const editor = combineReducers({
  contentBlocks,
  slides,
  contentGroups,
});

export default editor;
