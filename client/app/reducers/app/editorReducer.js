import Immutable from 'seamless-immutable';

import { SET_ACTIVE_SLIDE } from 'actions/slideActions';

const initialState = Immutable({
  activeSlide: null,
});

function editor(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_SLIDE:
      return { ...state, activeSlide: action.payload.slideId };
    default:
      return state;
  }
}

export default editor;
