import Immutable from 'seamless-immutable';

import { FETCH_SLIDES_SUCCESS } from 'actions/slideActions';

import {
  SET_ACTIVE_CONTENT_BLOCK,
  ADD_TITLE,
} from 'actions/contentBlockActions';

const initialState = Immutable({
  active: null,
  sequence: null,
});

export default function contentBlocks(state = initialState, action) {
  switch (action.type) {
    case ADD_TITLE:
      return {
        ...state,
        active: state.sequence,
        sequence: state.sequence + 1,
      };

    case FETCH_SLIDES_SUCCESS:
      return {
        ...state,
        sequence: action.payload.contentBlockSequence,
      };

    case SET_ACTIVE_CONTENT_BLOCK:
      return { ...state, active: action.payload.contentBlockId };

    default:
      return state;
  }
}
