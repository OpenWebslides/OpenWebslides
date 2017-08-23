export const OPEN_ANNOTATION_MODE = 'OPEN_ANNOTATION_MODE';
export const CLOSE_ANNOTATION_MODE = 'CLOSE_ANNOTATION_MODE';
export const SET_ACTIVE_CONVERSATION_ID = 'SET_ACTIVE_CONVERSATION_ID';


export function openAnnotationMode() {
  return { type: OPEN_ANNOTATION_MODE };
}

export function closeAnnotationMode() {
  return { type: CLOSE_ANNOTATION_MODE };
}

export function setActiveConversationId(conversationId) {
  return { type: SET_ACTIVE_CONVERSATION_ID, payload: { conversationId } };
}

