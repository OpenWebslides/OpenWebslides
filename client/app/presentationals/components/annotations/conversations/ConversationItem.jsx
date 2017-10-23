import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteConversation, rateConversation } from 'actions/entities/conversations';

function ConversationItem(props) {
  const {
    id,
    conversationType,
    title,
    user,
    byCurrentUser,
    deleted,
    rated,
    edited,
    rating,
    commentCount,
    createdTimeAgo,
    showConversationPanel,
  } = props;

  const iconClass = conversationType === 'question' ? 'fa-question' : 'fa-exclamation';
  const visibleTitle = _.truncate(title, { length: 80, separator: '.' });

  return (
    <div>
      <p className="soft-color">
        <a href="#" className="conversation-title" onClick={() => showConversationPanel(id)}>
          <i className={`fa annotation-type ${iconClass}`} aria-hidden="true" /> {visibleTitle} {edited ? '(Edited)' : ''}
        </a>
      </p>

      <p className="metadata no-margin" >{rating} votes - by {user.firstName} {user.lastName} - {commentCount} comments - {createdTimeAgo}</p>
      <p className="no-margin bold">
        { !deleted &&
        <button className="like-btn" onClick={() => props.rateConversation(id, rated)}>
          { rated ? <i className={'fa fa-arrow-up golden'} aria-hidden="true" />
                      : <i className={'fa fa-arrow-up'} aria-hidden="true" />}
        </button> }
        {byCurrentUser && !deleted &&
          <button className="del-btn" onClick={() => props.deleteConversation(id)}><i className={'fa fa-times'} aria-hidden="true" /></button>}
      </p>
      <hr className="delimiter" />
    </div>
  );
}

export default connect(
  null,
  (dispatch) => {
    return bindActionCreators({ deleteConversation, rateConversation }, dispatch);
  },
  )(ConversationItem);

ConversationItem.propTypes = {
  id: PropTypes.string.isRequired,
  conversationType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
  }).isRequired,
  byCurrentUser: PropTypes.bool.isRequired,
  deleted: PropTypes.bool.isRequired,
  rated: PropTypes.bool.isRequired,
  edited: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  createdTimeAgo: PropTypes.string.isRequired,
  rateConversation: PropTypes.func.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  showConversationPanel: PropTypes.func.isRequired,
};
