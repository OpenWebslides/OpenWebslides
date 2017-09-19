export const FETCH_CONVERSATION_COMMENTS = 'FETCH_CONVERSATION_COMMENTS';
export const FETCH_CONVERSATION_COMMENTS_SUCCESS = 'FETCH_CONVERSATION_COMMENTS_SUCCESS';
export const FETCH_CONVERSATION_COMMENTS_FAILURE = 'FETCH_CONVERSATION_COMMENTS_FAILURE';

export const FETCH_DECK_COMMENTS = 'FETCH_DECK_COMMENTS';
export const FETCH_DECK_COMMENTS_SUCCESS = 'FETCH_DECK_COMMENTS_SUCCESS';
export const FETCH_DECK_COMMENTS_FAILURE = 'FETCH_DECK_COMMENTS_FAILURE';



export const ADD_CONVERSATION_COMMENT = 'ADD_CONVERSATION_COMMENT';
export const DELETE_CONVERSATION_COMMENT = 'DELETE_CONVERSATION_COMMENT';

export const UPDATE_CONVERSATION_COMMENT = 'UPDATE_CONVERSATION_COMMENT';
export const UPDATE_CONVERSATION_COMMENT_SUCCESS = 'UPDATE_CONVERSATION_COMMENT_SUCCESS';

export const RATE_CONVERSATION_COMMENT = 'RATE_CONVERSATION_COMMENT';
export const RATE_CONVERSATION_COMMENT_SUCCESS = 'RATE_CONVERSATION_COMMENT_SUCCESS';

export function fetchConversationComments(conversationId) {
  return { type: FETCH_CONVERSATION_COMMENTS, meta: { conversationId } };
}

export function fetchDeckComments(deckId) {
  return { type: FETCH_DECK_COMMENTS, meta: { deckId } };
}

export function addConversationComment({ resolve, reject, values }) {
  return { type: ADD_CONVERSATION_COMMENT, meta: { resolve, reject, values } };
}

export function deleteConversationComment(conversationCommentId, conversationId) {
  return { type: DELETE_CONVERSATION_COMMENT, meta: { conversationCommentId, conversationId } };
}

export function updateConversationComment({ resolve, reject, values }) {
  return { type: UPDATE_CONVERSATION_COMMENT, meta: { resolve, reject, values } };
}

export function rateConversationComment(conversationCommentId, rated) {
  return { type: RATE_CONVERSATION_COMMENT, meta: { conversationCommentId, rated } };
}
