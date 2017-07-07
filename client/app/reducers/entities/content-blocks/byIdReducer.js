import _ from 'lodash';

import contentBlockConfigs from 'lib/content-block-configs';

import { UPDATE_SLIDE } from 'actions/slideActions';
import { FETCH_DECK_SUCCESS } from 'actions/deckActions';
import {
  ADD_CONTENT_BLOCK,
  DELETE_CONTENT_BLOCKS,
} from 'actions/contentBlockActions';

const initialState = {};

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTENT_BLOCK:
      return {
        ...state,
        [action.payload.contentBlockId]: {
          id: action.payload.contentBlockId,
          type: action.payload.type,
          data: EditorState.createWithContent(
            convertFromHTML(
              contentBlockConfigs[action.payload.type].createEmpty,
            ),
          ),
        },
      };
    case DELETE_CONTENT_BLOCKS:
      return _.omit(state, action.payload.contentBlocksToDelete);

    case UPDATE_SLIDE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          data: action.payload.data,
        },
      };

    case FETCH_DECK_SUCCESS:
      return action.payload.contentBlocks;
    default:
      return state;
  }
}

export default byId;
