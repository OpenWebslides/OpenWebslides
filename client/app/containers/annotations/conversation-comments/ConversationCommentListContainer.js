import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConversationCommentList from 'presentationals/components/annotations/conversation-comments/ConversationCommentList';
import { getConversationById } from 'selectors/entities/conversations';
import { getEditableConversationCommentId } from 'selectors/app/annotations';

import { fetchConversationComments, deleteConversationComment } from 'actions/entities/conversation-comments';
import { setEditableConversationComment } from 'actions/app/annotations';

function mapStateToProps(state) {
  const activeConversationId = state.app.annotations.activeConversationId;

  return {
    activeConversationId: state.app.annotations.activeConversationId,
    conversationComments: state.entities.conversationComments.byId,
    activeConversation: getConversationById(state, activeConversationId),
    editableConversationCommentId: getEditableConversationCommentId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConversationComments, deleteConversationComment, setEditableConversationComment }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationCommentList);
