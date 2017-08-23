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
              console.log(conversation);
              const { id, conversationType, title, user, byCurrentUser } = conversation;

              const iconClass = conversationType === 'question' ? 'fa-question' : 'fa-comment';

              return (
                <li key={id}>
                  {byCurrentUser && <div><button>Edit</button><button>Delete</button></div>}
                  <a href="#" onClick={() => this.props.showConversationComments(id)}><i className={`fa ${iconClass}`} aria-hidden="true" /> {_.truncate(title, { length: 80, separator: '.' })}</a>
                  <p>by <strong> {user.firstName} {user.lastName}</strong></p>
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
  showConversationComments: PropTypes.func.isRequired,
};

SlideConversationList.defaultProps = {
  conversations: null,
};

