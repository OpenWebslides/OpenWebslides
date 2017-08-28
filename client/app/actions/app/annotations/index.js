export const OPEN_ANNOTATION_MODE = 'OPEN_ANNOTATION_MODE';
export const CLOSE_ANNOTATION_MODE = 'CLOSE_ANNOTATION_MODE';
export const SET_ACTIVE_CONVERSATION_ID = 'SET_ACTIVE_CONVERSATION_ID';
export const SET_EDITING_CONVERSATION = 'SET_EDITING_CONVERSATION';
export const UNSET_EDITING_CONVERSATION = 'UNSET_EDITING_CONVERSATION';
export const SET_EDITABLE_CONVERSATION_COMMENT = 'SET_EDITABLE_CONVERSATION_COMMENT';
export const UNSET_EDITABLE_CONVERSATION_COMMENT = 'UNSET_EDITABLE_CONVERSATION_COMMENT';

export function openAnnotationMode() {
  return { type: OPEN_ANNOTATION_MODE };
}

export function closeAnnotationMode() {
  return { type: CLOSE_ANNOTATION_MODE };
}

export function setActiveConversationId(conversationId) {
  return { type: SET_ACTIVE_CONVERSATION_ID, payload: { conversationId } };
}

export function setEditableConversationComment(conversationCommentId) {
  return { type: SET_EDITABLE_CONVERSATION_COMMENT, payload: { conversationCommentId } };
}

export function setEditingConversation() {
  return { type: SET_EDITING_CONVERSATION };
}

