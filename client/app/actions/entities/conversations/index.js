export const FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS';
export const FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAILURE = 'FETCH_CONVERSATIONS_FAILURE';

export const ADD_CONVERSATION = 'ADD_CONVERSATION';
export const DELETE_CONVERSATION = 'DELETE_CONVERSATION';

export function fetchConversations() {
  return { type: FETCH_CONVERSATIONS };
}

export function deleteConversation(conversationId) {
  return { type: DELETE_CONVERSATION, meta: { conversationId } };
}

export function addConversation({ resolve, reject, values }) {
  return { type: ADD_CONVERSATION, meta: { resolve, reject, values },
  };
}
