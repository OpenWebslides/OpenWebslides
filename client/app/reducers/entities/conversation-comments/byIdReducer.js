import Immutable from 'seamless-immutable';

import { FETCH_CONVERSATION_COMMENTS_SUCCESS } from 'actions/entities/conversation-comments';

const initialState = Immutable({});

function byIdReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONVERSATION_COMMENTS_SUCCESS:
      return Immutable(action.payload);
    default:
      return state;
  }
}


export default byIdReducer;
