import React from 'react';
import PropTypes from 'prop-types';

import CommentElement from 'presentationals/components/print-view/CommentElement';



function ConversationElement(props) {
  const {
    conversationType,
    title,
    user,
    createdTimeAgo,
    text,
    comments,
  } = props;

  let lastPart;

  if (comments) {
    const commentElements = comments.map((comment) => {
      return CommentElement(comment);
    });
    lastPart = (
      <div className="c_print-view__conversation-element--comments-list-wrapper">
        <ul className="c_print-view__conversation-element--comments-list" >
          {commentElements}
        </ul>
      </div>
    );
  }
  else {
    lastPart = '';
  }
  return (
    <div className="c_print-view__conversation-element--container">
      <div className="c_print-view__conversation-element--header-container">
        <h1 className="c_print-view__conversation-element--title">{title}</h1>
        <p className="c_print-view__conversation-element--text">{text}</p>
        <p className="c_print-view__conversation-element--user-and-time">
          Posted by {user.firstName} {user.lastName}, {createdTimeAgo}
        </p>
      </div>{lastPart}
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
