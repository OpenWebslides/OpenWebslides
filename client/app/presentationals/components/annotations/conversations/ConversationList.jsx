import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConversationItem from './ConversationItem';

export default class SlideConversationList extends Component {

  componentDidMount() {
    this.props.fetchConversations();
  }

  render() {
    const { conversations, rateConversation, deleteConversation, showConversationComments } = this.props;

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
                  showConversationComments={showConversationComments}
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


}

SlideConversationList.propTypes = {
  conversations: PropTypes.arrayOf(Object),
  fetchConversations: PropTypes.func.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  rateConversation: PropTypes.func.isRequired,
  showConversationComments: PropTypes.func.isRequired,
};

SlideConversationList.defaultProps = {
  conversations: null,
};

