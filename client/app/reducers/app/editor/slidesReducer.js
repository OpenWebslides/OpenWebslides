import Immutable from 'seamless-immutable';

import {
  SET_ACTIVE_SLIDE,
  FETCH_SLIDES_SUCCESS,
  ADD_SLIDE,
} from 'actions/slideActions';

const initialState = Immutable({
  active: null,
  sequence: null,
});

export default function slides(state = initialState, action) {
  switch (action.type) {
    case ADD_SLIDE:
      return {
        ...state,
        active: state.sequence,
        sequence: state.sequence + 1,
      };

    case FETCH_SLIDES_SUCCESS:
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
