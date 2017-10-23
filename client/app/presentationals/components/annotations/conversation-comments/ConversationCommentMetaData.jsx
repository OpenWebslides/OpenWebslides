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
      {children}

      <p className="metadata" >{rating} votes - by <strong> {user.firstName} {user.lastName}</strong> - {createdTimeAgo} {edited ? '- (Edited)' : ''}</p>

      <p className="no-margin">
        {!deleted &&
        <button className="like-btn" onClick={() => props.rateConversationComment(id, rated)}>
          { rated ? <i className={'fa fa-arrow-up golden'} aria-hidden="true" />
                      : <i className={'fa fa-arrow-up'} aria-hidden="true" />}
        </button> }
        {byCurrentUser && !deleted && !editing &&
          <span>
            <button className="like-btn" onClick={() => props.setEditableConversationComment(id)}><i className={'fa fa-pencil'} aria-hidden="true" /></button>
            <button className="del-btn" onClick={() => props.deleteConversationComment(id, activeConversationId)}><i className={'fa fa-times'} aria-hidden="true" /></button>
          </span>}
      </p>
      <hr className="delimiter" />
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

