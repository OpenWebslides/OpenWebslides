export const FETCH_CONVERSATION_COMMENTS = 'FETCH_CONVERSATION_COMMENTS';
export const FETCH_CONVERSATION_COMMENTS_SUCCESS = 'FETCH_CONVERSATION_COMMENTS_SUCCESS';
export const FETCH_CONVERSATION_COMMENTS_FAILURE = 'FETCH_CONVERSATION_COMMENTS_FAILURE';

export const ADD_CONVERSATION_COMMENT = 'ADD_CONVERSATION_COMMENT';

export function fetchConversationComments(conversationId) {
  return { type: FETCH_CONVERSATION_COMMENTS, meta: { conversationId } };
}

export function addConversationComment({ resolve, reject, values }) {
  return { type: ADD_CONVERSATION_COMMENT, meta: { resolve, reject, values },
  };
}
