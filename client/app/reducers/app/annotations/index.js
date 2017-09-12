import Immutable from 'seamless-immutable';

import {
  TOGGLE_ANNOTATION_MODE,
  SET_ACTIVE_CONVERSATION_ID,
  SET_IS_EDITING_CONVERSATION,
  UNSET_IS_EDITING_CONVERSATION,
  SET_EDITABLE_CONVERSATION_COMMENT,
  UNSET_EDITABLE_CONVERSATION_COMMENT,
} from 'actions/app/annotations';

const initialState = Immutable({
  annotationMode: false,
  activeConversationId: null,
  isEditingConversation: false,
});

export default function annotationReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ANNOTATION_MODE: {
      const annotationModeCurrent = state.annotationMode;
      return state.merge({ annotationMode: !annotationModeCurrent });
    }
    case SET_IS_EDITING_CONVERSATION:
      return state.merge({ isEditingConversation: true });
    case UNSET_IS_EDITING_CONVERSATION:
      return state.merge({ isEditingConversation: false });
    case SET_ACTIVE_CONVERSATION_ID:
      return state.merge({ activeConversationId: action.payload.conversationId });
    case SET_EDITABLE_CONVERSATION_COMMENT:
      return state.merge({ editableConversationCommentId: action.payload.conversationCommentId });
    case UNSET_EDITABLE_CONVERSATION_COMMENT:
      return state.merge({ editableConversationCommentId: null });
    default:
      return state;
  }
}
