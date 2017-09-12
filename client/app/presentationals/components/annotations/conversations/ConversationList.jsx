import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getConversationsForActiveSlide from 'selectors/entities/conversations';
import { fetchConversations } from 'actions/entities/conversations';
import ConversationItem from './ConversationItem';

function ConversationList(props) {
  const { conversations, showConversationPanel } = props;

  if (conversations.length !== 0) {
    return (
      <ul className="list-style-none">
        {conversations.map((conversation) => {
          const { id } = conversation;

          return (
            <li key={id}>
              <ConversationItem
                {...conversation}
                showConversationPanel={showConversationPanel}
              />
            </li>);
        })}
      </ul>
    );
  }

  return (
    <h4>
      No conversations have been added on this slide.
      <br />
      Be the first one!
    </h4>
  );
}

export default compose(
  connect(
    (state) => {
      return { conversations: getConversationsForActiveSlide(state) };
    },
    (dispatch) => {
      return bindActionCreators({
        fetchConversations,
      }, dispatch);
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchConversations();
    },
  }),
)(ConversationList);

ConversationList.propTypes = {
  conversations: PropTypes.arrayOf(Object),
  fetchConversations: PropTypes.func.isRequired,
  showConversationPanel: PropTypes.func.isRequired,
};

ConversationList.defaultProps = {
  conversations: null,
};

