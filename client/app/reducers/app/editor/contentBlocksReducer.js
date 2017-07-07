import Immutable from 'seamless-immutable';

import { FETCH_DECK_SUCCESS } from 'actions/deckActions';

import {
  SET_ACTIVE_CONTENT_BLOCK,
  ADD_CONTENT_BLOCK,
} from 'actions/contentBlockActions';

const initialState = Immutable({
  active: null,
  sequence: null,
});

export default function contentBlocks(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTENT_BLOCK:
      return {
        ...state,
        active: state.sequence,
        sequence: state.sequence + 1,
      };

    case FETCH_DECK_SUCCESS:
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
