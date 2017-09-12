export const TOGGLE_ANNOTATION_MODE = 'TOGGLE_ANNOTATION_MODE';
export const SET_ACTIVE_CONVERSATION_ID = 'SET_ACTIVE_CONVERSATION_ID';
export const SET_IS_EDITING_CONVERSATION = 'SET_IS_EDITING_CONVERSATION';
export const UNSET_IS_EDITING_CONVERSATION = 'UNSET_IS_EDITING_CONVERSATION';
export const SET_EDITABLE_CONVERSATION_COMMENT = 'SET_EDITABLE_CONVERSATION_COMMENT';
export const UNSET_EDITABLE_CONVERSATION_COMMENT = 'UNSET_EDITABLE_CONVERSATION_COMMENT';

export function toggleAnnotationMode() {
  return { type: TOGGLE_ANNOTATION_MODE };
}

export function setActiveConversationId(conversationId) {
  return { type: SET_ACTIVE_CONVERSATION_ID, payload: { conversationId } };
}

export function setEditableConversationComment(conversationCommentId) {
  return { type: SET_EDITABLE_CONVERSATION_COMMENT, payload: { conversationCommentId } };
}

export function unsetEditableConversationComment() {
  return { type: UNSET_EDITABLE_CONVERSATION_COMMENT, payload: { conversationCommentId: null } };
}

export function setIsEditingConversation() {
  return { type: SET_IS_EDITING_CONVERSATION };
}

export function unsetIsEditingConversation() {
  return { type: UNSET_IS_EDITING_CONVERSATION };
}

