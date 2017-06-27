import Immutable from 'seamless-immutable';

import { FETCH_SLIDES_SUCCESS } from 'actions/slideActions';

const initialState = Immutable({
  active: null,
  sequence: null,
});

export default function contentGroups(state = initialState, action) {
  switch (action.type) {
    case FETCH_SLIDES_SUCCESS:
      return {
        ...state,
        sequence: action.payload.contentGroupSequence,
      };

    default:
      return state;
  }
}
