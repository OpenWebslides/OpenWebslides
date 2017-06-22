import { FETCH_SLIDES_SUCCESS, UPDATE_SLIDE } from 'actions/slideActions';

const initialState = {};

function byId(state = initialState, action) {
  switch (action.type) {
    case FETCH_SLIDES_SUCCESS:
      return action.payload.slides;
    default:
      return state;
  }
}

export default byId;
