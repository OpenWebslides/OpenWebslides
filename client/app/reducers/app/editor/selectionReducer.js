import Immutable from 'seamless-immutable';

import { UPDATE_SELECTION } from 'actions/contentBlockActions';

const initialState = Immutable({
  start: 0,
  end: 0,
});

export default function selectionOffsets(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTION:
      console.log(action);
      return Immutable.merge(state, action.payload.selectionOffsets, { deep: true });

    default:
      return state;
  }
}
