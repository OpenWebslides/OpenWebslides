import { connect } from 'react-redux';

import SlideConversationList from 'presentationals/components/annotations/SlideConversationList';

import getConversationsForActiveSlide from 'selectors/entities/conversations';

function mapStateToProps(state) {
  const conversations = getConversationsForActiveSlide(state);

  return ({ conversations });
}

export default connect(mapStateToProps)(SlideConversationList);
