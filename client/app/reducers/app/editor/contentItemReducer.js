import Immutable from 'seamless-immutable';

import { FETCH_DECK_SUCCESS } from 'actions/deckActions';

const initialState = Immutable({
  active: null,
  sequence: null,
});

export default function contentItems(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECK_SUCCESS:
      return {
        ...state,
        sequence: action.payload.contentItemSequence,
      };

    default:
      return state;
  }
}
