import Immutable from 'seamless-immutable';

import { FETCH_CONVERSATIONS_SUCCESS } from 'actions/entities/conversations';

const initialState = Immutable({});

function byIdReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONVERSATIONS_SUCCESS:
      console.log(action);
      return state;
    default:
      return state;
  }
}


export default byIdReducer;
