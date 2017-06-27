import { FETCH_SLIDES_SUCCESS, UPDATE_SLIDE } from 'actions/slideActions';
import { ADD_TITLE } from 'actions/contentBlockActions';
import { EditorState } from 'draft-js';

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
    case UPDATE_SLIDE:
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          data: action.payload.content,
        },
      };

    case FETCH_SLIDES_SUCCESS:
      return action.payload.contentBlocks;
    default:
      return state;
  }
}

export default byId;
