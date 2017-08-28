import React from 'react';
import PropTypes from 'prop-types';


export default function ConversationCommentItem(props) {
  const {
    id,
    rating,
    text,
    rated,
    user,
    createdTimeAgo,
    byCurrentUser,
    deleted,
    edited,
    rateConversationComment,
    setEditableConversationComment,
    deleteConversationComment,
    conversationId,
  } = props;

  return (
    <div>
      <p>
        Rating: {rating}
        {!deleted &&
          <button onClick={() => rateConversationComment(id, rated)}>{ rated ? '</3' : '<3'}</button>}
      </p>

      <span>
        {byCurrentUser && !deleted &&
          <div>
            <button onClick={() => setEditableConversationComment(id)}>Edit</button>
            <button onClick={() => deleteConversationComment(id, conversationId)}>Delete</button>
          </div>}
      </span>

      <p><strong>{user.firstName} {user.lastName} {edited ? '(Edited)' : ''} </strong> wrote:</p>

      <p>{deleted ? '(Deleted)' : text}</p>

      <p><em>Written <strong>{createdTimeAgo}</strong></em></p>
    </div>
  );
}

ConversationCommentItem.propTypes = {
  id: PropTypes.number.isRequired,
  conversationId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  rated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  createdTimeAgo: PropTypes.string.isRequired,
  byCurrentUser: PropTypes.bool.isRequired,
  deleted: PropTypes.bool.isRequired,
  edited: PropTypes.bool.isRequired,
  flagged: PropTypes.bool.isRequired,
  secret: PropTypes.bool.isRequired,
  rateConversationComment: PropTypes.func.isRequired,
  setEditableConversationComment: PropTypes.func.isRequired,
  deleteConversationComment: PropTypes.func.isRequired,
};

