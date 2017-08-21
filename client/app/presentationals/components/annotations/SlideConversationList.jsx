import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


export default function SlideConversationList(props) {
  const { conversations } = props;

  if (conversations) {
    return (
      <div>
        <ul className="conversations-list">
          {conversations.map((conversation) => {
            const { id, conversationType, text, user } = conversation;

            const iconClass = conversationType === 'question' ? 'fa-question' : 'fa-comment';

            return (
              <li key={id}>
                <p><i className={`fa ${iconClass}`} aria-hidden="true" /> {_.truncate(text, { length: 80, separator: '.' })}</p>
                <p>by <strong> {user.firstName} {user.lastName}</strong></p>
                <hr />
              </li>);
          })}
        </ul>

      </div>);
  }
  return (
    <h4>No conversations have been added on this slide.</h4>
  );
}

SlideConversationList.propTypes = {
  conversations: PropTypes.arrayOf(Object),
};

SlideConversationList.defaultProps = {
  conversations: null,
};

