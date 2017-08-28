import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class SlideConversationList extends Component {

  componentDidMount() {
    this.props.fetchConversations();
  }

  render() {
    const { conversations } = this.props;

    if (conversations.length !== 0) {
      return (
        <div>
          <ul className="list-style-none">
            {conversations.map((conversation) => {
              const { id, conversationType, title, user, byCurrentUser, flagged, deleted, secret, rated, edited, rating, commentCount, createdTimeAgo } = conversation;

              const iconClass = conversationType === 'question' ? 'fa-question' : 'fa-comment';

              const visibleTitle = _.truncate(title, { length: 80, separator: '.' });

              let RateButtonText;
              if (rated) {
                RateButtonText = '</3';
              }
              else {
                RateButtonText = '<3';
              }

              return (
                <li key={id}>
                  <p>Rating: {rating} <button onClick={() => this.props.rateConversation(id, rated)}>{RateButtonText}</button></p>
                  {byCurrentUser && !deleted && <div><button onClick={() => this.props.deleteConversation(id)}>Delete</button></div>}
                  <a href="#" onClick={() => this.props.showConversationComments(id)}><i className={`fa ${iconClass}`} aria-hidden="true" /> {visibleTitle}</a>
                  <p>by <strong> {user.firstName} {user.lastName}</strong> - Posted {createdTimeAgo} - {commentCount} Comments</p>
                  <hr />
                </li>);
            })}
          </ul>

        </div>);
    }

    return (
      <h4>No conversations have been added on this slide.
        <br />
        Be the first one!
        </h4>
    );
  }


}

SlideConversationList.propTypes = {
  conversations: PropTypes.arrayOf(Object),
  fetchConversations: PropTypes.func.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  rateConversation: PropTypes.func.isRequired,
  showConversationComments: PropTypes.func.isRequired,
};

SlideConversationList.defaultProps = {
  conversations: null,
};

