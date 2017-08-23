import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConversationList from 'presentationals/components/annotations/conversations/ConversationList';

import getConversationsForActiveSlide from 'selectors/entities/conversations';
import { fetchConversations, deleteConversation } from 'actions/entities/conversations';

function mapStateToProps(state) {
  const conversations = getConversationsForActiveSlide(state);

  return ({ conversations });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConversations, deleteConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);
