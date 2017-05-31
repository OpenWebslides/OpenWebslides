import Immutable from 'seamless-immutable';

import { FETCH_SLIDES_SUCCESS } from 'actions/fetchSlidesActions';
import { UPDATE_CONTENT_BLOCK } from 'actions/updateContentBlockActions';

const initialState = {};

function setActiveDeck(state = initialState, action) {
  switch (action.type) {
    case FETCH_SLIDES_SUCCESS:
      return Immutable.merge(state, action.payload);
    case UPDATE_CONTENT_BLOCK:
      console.log(action.payload.contentBlockId);
      return Immutable.merge(state);

    default:
      return state;
  }
}

export default setActiveDeck;
