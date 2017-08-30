import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';

import ConversationItem from './ConversationItem';


function ConversationList(props) {
  const { conversations, rateConversation, deleteConversation, showConversationPanel } = props;

  if (conversations.length !== 0) {
    return (
      <ul className="list-style-none">
        {conversations.map((conversation) => {
          const { id } = conversation;

          return (
            <li key={id}>
              <ConversationItem
                {...conversation}
                rateConversation={rateConversation}
                deleteConversation={deleteConversation}
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
  lifecycle({
    componentDidMount() {
      this.props.fetchConversations();
    },
  }),
)(ConversationList);


ConversationList.propTypes = {
  conversations: PropTypes.arrayOf(Object),
  fetchConversations: PropTypes.func.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  rateConversation: PropTypes.func.isRequired,
  showConversationPanel: PropTypes.func.isRequired,
};

ConversationList.defaultProps = {
  conversations: null,
};

