import Immutable from 'seamless-immutable';

import { FETCH_DECK_SUCCESS } from 'actions/deckActions';
import { SET_ACTIVE_CONTENT_ITEM } from 'actions/contentBlockActions';

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

    case SET_ACTIVE_CONTENT_ITEM:
      return Immutable.merge(state, { active: action.payload.contentItemId }, { deep: true });

    default:
      return state;
  }
}
