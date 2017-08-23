import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SlideConversationList from 'presentationals/components/annotations/conversations/SlideConversationList';

import getConversationsForActiveSlide from 'selectors/entities/conversations';
import { fetchConversations } from 'actions/entities/conversations';

function mapStateToProps(state) {
  const conversations = getConversationsForActiveSlide(state);

  return ({ conversations });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConversations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideConversationList);
