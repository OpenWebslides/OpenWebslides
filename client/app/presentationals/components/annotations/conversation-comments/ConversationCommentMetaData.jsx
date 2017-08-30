import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteConversationComment, rateConversationComment } from
  'actions/entities/conversation-comments';
import { setEditableConversationComment } from 'actions/app/annotations';

function ConversationCommentMetaData(props) {
  const {
    id,
    rating,
    children,
    rated,
    user,
    createdTimeAgo,
    byCurrentUser,
    deleted,
    edited,
    editing,
    activeConversationId,
  } = props;

  return (
    <div>
      <p>
        Rating: {rating}
        {!deleted &&
          <button onClick={() => props.rateConversationComment(id, rated)}>{ rated ? '</3' : '<3'}</button>}
      </p>

      <p><strong>{user.firstName} {user.lastName} {edited ? '(Edited)' : ''} </strong> wrote:</p>

      {children}

      <p><em>Written <strong>{createdTimeAgo}</strong></em></p>

      <span>
        {byCurrentUser && !deleted && !editing &&
          <div>
            <button onClick={() => props.setEditableConversationComment(id)}>Edit</button>
            <button onClick={() => props.deleteConversationComment(id, activeConversationId)}>Delete</button>
          </div>}
      </span>
      <hr />
    </div>
  );
}

export default connect(
  null,
  (dispatch) => {
    return bindActionCreators({
      setEditableConversationComment, rateConversationComment, deleteConversationComment,
    }, dispatch);
  },
)(ConversationCommentMetaData);

ConversationCommentMetaData.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.objectOf(Object).isRequired,
  activeConversationId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  rated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  createdTimeAgo: PropTypes.string.isRequired,
  byCurrentUser: PropTypes.bool.isRequired,
  deleted: PropTypes.bool.isRequired,
  edited: PropTypes.bool.isRequired,
  editing: PropTypes.bool,
  flagged: PropTypes.bool.isRequired,
  secret: PropTypes.bool.isRequired,
  rateConversationComment: PropTypes.func.isRequired,
  setEditableConversationComment: PropTypes.func.isRequired,
  deleteConversationComment: PropTypes.func.isRequired,
};

ConversationCommentMetaData.defaultProps = {
  editing: false,
};

