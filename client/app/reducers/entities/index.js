import { combineReducers } from 'redux';

import contentItems from 'reducers/entities/content-items';
import decks from 'reducers/entities/decks';
import slides from 'reducers/entities/slides';
import users from 'reducers/entities/users';
import conversations from 'reducers/entities/conversations';
import conversationComments from 'reducers/entities/conversation-comments';

const entities = combineReducers({
  decks,
  slides,
  users,
  contentItems,
  conversations,
  conversationComments,
});

export default entities;
