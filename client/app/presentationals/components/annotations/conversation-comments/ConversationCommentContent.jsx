import React from 'react';
import PropTypes from 'prop-types';

export default function ConversationCommentContent(props) {
  const { text, deleted } = props;

  return (
    <div>
      <p>{deleted ? '(Deleted)' : text}</p>
    </div>
  );
}

ConversationCommentContent.propTypes = {
  text: PropTypes.string.isRequired,
  deleted: PropTypes.bool.isRequired,
};

