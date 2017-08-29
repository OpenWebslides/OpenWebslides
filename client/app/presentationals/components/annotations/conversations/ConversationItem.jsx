import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default function ConversationItem(props) {
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
    rateConversation,
    deleteConversation,
    showConversationPanel,
  } = props;

  console.log(props);

  const iconClass = conversationType === 'question' ? 'fa-question' : 'fa-comment';
  const visibleTitle = _.truncate(title, { length: 80, separator: '.' });

  return (
    <div>
      <p>
        Rating: {rating}
        { !deleted &&
          <button onClick={() => rateConversation(id, rated)}>{ rated ? '</3' : '<3'}</button> }
      </p>

      {byCurrentUser && !deleted &&
        <div>
          <button onClick={() => deleteConversation(id)}>Delete</button>
        </div>}

      <a href="#" onClick={() => showConversationPanel(id)}>
        <i className={`fa ${iconClass}`} aria-hidden="true" /> {visibleTitle} {edited ? '(Edited)' : ''}
      </a>

      <p>by <strong> {user.firstName} {user.lastName}</strong> - Posted {createdTimeAgo} - {commentCount} Comments</p>

      <hr />
    </div>
  );
}

ConversationItem.propTypes = {
  id: PropTypes.number.isRequired,
  conversationType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
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
