import { EditorState } from 'draft-js';
import _ from 'lodash';

import { FETCH_SLIDES_SUCCESS, UPDATE_SLIDE } from 'actions/slideActions';
import { ADD_TITLE, DELETE_CONTENT_BLOCKS } from 'actions/contentBlockActions';

const initialState = {};

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_TITLE:
      return {
        ...state,
        [action.payload.contentBlockId]: {
          id: action.payload.contentBlockId,
          data: EditorState.createEmpty(),
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

    case FETCH_SLIDES_SUCCESS:
      return action.payload.contentBlocks;
    default:
      return state;
  }
}

export default byId;
