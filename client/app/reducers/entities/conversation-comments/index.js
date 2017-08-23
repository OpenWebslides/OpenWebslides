import { combineReducers } from 'redux';

import byId from 'reducers/entities/conversation-comments/byIdReducer';

const conversationComments = combineReducers({
  byId,
});

export default conversationComments;
