export const FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS';
export const FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAILURE = 'FETCH_CONVERSATIONS_FAILURE';

export const ADD_CONVERSATION = 'ADD_CONVERSATION';
export const DELETE_CONVERSATION = 'DELETE_CONVERSATION';
export const RATE_CONVERSATION = 'RATE_CONVERSATION';
export const RATE_CONVERSATION_SUCCESS = 'RATE_CONVERSATION_SUCCESS';

export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
export const UPDATE_CONVERSATION_SUCCESS = 'UPDATE_CONVERSATION_SUCCESS';

export function fetchConversations(deckId) {
  if (deckId) {
    return {
      type: FETCH_CONVERSATIONS,
      meta: {
        deckId,
      },
    };
  }
  else {
    return { type: FETCH_CONVERSATIONS };
  }
}

export function deleteConversation(conversationId) {
  return { type: DELETE_CONVERSATION, meta: { conversationId } };
}

export function addConversation({ resolve, reject, values }) {
  return { type: ADD_CONVERSATION, meta: { resolve, reject, values },
  };
}

export function rateConversation(conversationId, rated) {
  return { type: RATE_CONVERSATION, meta: { conversationId, rated } };
}

export function updateConversation({ resolve, reject, values }) {
  return { type: UPDATE_CONVERSATION, meta: { resolve, reject, values } };
}
