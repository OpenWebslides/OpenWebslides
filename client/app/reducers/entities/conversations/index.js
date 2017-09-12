import { combineReducers } from 'redux';

import byId from 'reducers/entities/conversations/byIdReducer';

const conversations = combineReducers({
  byId,
});

export default conversations;
