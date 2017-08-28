import Immutable from 'seamless-immutable';

import { FETCH_CONVERSATIONS_SUCCESS, RATE_CONVERSATION_SUCCESS, UPDATE_CONVERSATION_SUCCESS } from 'actions/entities/conversations';

const initialState = Immutable({});

function byIdReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONVERSATIONS_SUCCESS:
      return state.merge(action.payload);

    case UPDATE_CONVERSATION_SUCCESS : {
      const { id, attributes } = action.payload;

      return state.merge({ [id]: { ...attributes } }, { deep: true });
    }

    case RATE_CONVERSATION_SUCCESS: {
      const { id, attributes } = action.payload;

      return state.merge({ [id]: { ...attributes } }, { deep: true });
    }
    default:
      return state;
  }
}


export default byIdReducer;
