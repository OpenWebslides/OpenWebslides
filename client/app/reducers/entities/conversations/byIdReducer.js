import Immutable from 'seamless-immutable';

import { FETCH_CONVERSATIONS_SUCCESS } from 'actions/entities/conversations';

const initialState = Immutable({});

function byIdReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONVERSATIONS_SUCCESS:
      return state.merge(action.payload);
    default:
      return state;
  }
}


export default byIdReducer;
