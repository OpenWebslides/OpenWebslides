import Immutable from 'seamless-immutable';

import { UPDATE_SELECTION } from 'actions/deckActions';

const initialState = Immutable({
  selectionOffsets: {
    start: 0,
    end: 0,
  },
});

export default function contentItems(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTION:
      return {
        ...state,
        selectionOffsets: action.payload.selectionOffsets,
      };

    default:
      return state;
  }
}
