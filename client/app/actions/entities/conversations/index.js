export const FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS';
export const FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAILURE = 'FETCH_CONVERSATIONS_FAILURE';

export const ADD_CONVERSATION = 'ADD_CONVERSATION';

export function fetchConversations() {
  return { type: FETCH_CONVERSATIONS };
}

export function addConversation({ resolve, reject, values }) {
  return { type: ADD_CONVERSATION, meta: { resolve, reject, values },
  };
}
