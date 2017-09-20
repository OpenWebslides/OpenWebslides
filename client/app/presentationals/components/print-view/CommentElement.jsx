import React from 'react';
import PropTypes from 'prop-types';


function CommentElement(props) {
  const {
    id,
    user,
    createdTimeAgo,
    text,
  } = props;


  return (
    <li className="c_print-view__comment-element--list-item" key={id}>
      <div className="c_print-view__comment-element--container">
        <p className="c_print-view__comment-element--text">{text}</p>
        <p className="c_print-view__comment-element--user-and-time">
          Commented by {user.firstName} {user.lastName}, {createdTimeAgo}
        </p>
      </div>
    </li>
  );
}

CommentElement.propTypes = {
  conversationType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
  }).isRequired,
  text: PropTypes.string.isRequired,
  createdTimeAgo: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default CommentElement;
