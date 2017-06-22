import { FETCH_SLIDES_SUCCESS, UPDATE_SLIDE } from 'actions/slideActions';

const initialState = {};

function byId(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SLIDE:
      return {
        ...state,
        [action.payload.id]: { data: action.payload.content },
      };

    case FETCH_SLIDES_SUCCESS:
      return action.payload.contentBlocks;
    default:
      return state;
  }
}

export default byId;
