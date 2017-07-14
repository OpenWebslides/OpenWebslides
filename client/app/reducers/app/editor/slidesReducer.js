import Immutable from 'seamless-immutable';
import { FETCH_DECK_SUCCESS } from 'actions/deckActions';

import { SET_ACTIVE_SLIDE, ADD_SLIDE } from 'actions/slideActions';

const initialState = Immutable({
  active: null,
  sequence: null,
});

export default function slides(state = initialState, action) {
  switch (action.type) {
    case ADD_SLIDE:
      return {
        ...state,
        active: action.payload.slideId,
        sequence: state.sequence + 1,
      };

    case FETCH_DECK_SUCCESS:
      return {
        ...state,
        sequence: action.payload.slideSequence,
      };

    case SET_ACTIVE_SLIDE:
      return { ...state, active: action.payload.slideId };

    default:
      return state;
  }
}
