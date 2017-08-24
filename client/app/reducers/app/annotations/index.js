import Immutable from 'seamless-immutable';

import {
  OPEN_ANNOTATION_MODE,
  CLOSE_ANNOTATION_MODE,
  SET_ACTIVE_CONVERSATION_ID,
  SET_EDITABLE_CONVERSATION_COMMENT,
  UNSET_EDITABLE_CONVERSATION_COMMENT,
} from 'actions/app/annotations';

const initialState = Immutable({
  annotationMode: false,
  activeConversationId: null,
});

export default function annotationReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ANNOTATION_MODE:
      return state.merge({ annotationMode: true });
    case CLOSE_ANNOTATION_MODE:
      return state.merge({ annotationMode: false });
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
