import { FETCH_SLIDES_SUCCESS } from 'actions/slideActions';
import { ADD_TITLE } from 'actions/contentBlockActions';

const initialState = {};

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_TITLE:
    case FETCH_SLIDES_SUCCESS:
      return action.payload.slides;
    default:
      return state;
  }
}

export default byId;
