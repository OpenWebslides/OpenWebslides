import React from 'react';
import PropTypes from 'prop-types';


function ConversationElement(props) {
  const {
    conversationType,
    title,
    user,
    createdTimeAgo,
    text,
  } = props;


  return (
    <div className="c_print-view__conversation-element--container">
      <h1 className="c_print-view__conversation-element--title">{title}</h1>
      <p className="c_print-view_conversation-element--text">{text}</p>
      <p className="c_print-view_conversation-element--creationTime">{createdTimeAgo}</p>
      <p className="c_print-view_conversation-element--user">Posted by: {user.firstName} {user.lastName}</p>
    </div>
  );
}

ConversationElement.propTypes = {
  conversationType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
  }).isRequired,
  text: PropTypes.string.isRequired,
  createdTimeAgo: PropTypes.string.isRequired,
};

export default ConversationElement;