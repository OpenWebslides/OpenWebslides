import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConversationCommentList from 'presentationals/components/annotations/conversation-comments/ConversationCommentList';
import { getConversationById } from 'selectors/entities/conversations';

import { fetchConversationComments } from 'actions/entities/conversation-comments';

function mapStateToProps(state) {
  const activeConversationId = state.app.annotations.activeConversationId;

  return {
    activeConversationId: state.app.annotations.activeConversationId,
    conversationComments: state.entities.conversationComments.byId,
    activeConversation: getConversationById(state, activeConversationId),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConversationComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationCommentList);
