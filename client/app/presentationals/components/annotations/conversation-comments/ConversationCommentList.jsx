import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import ConversationCommentFormContainer from 'containers/annotations/conversation-comments/ConversationCommentFormContainer';

export default class ConversationCommentsList extends Component {
  constructor() {
    super();

    this.scrollToForm = this.scrollToForm.bind(this);
  }

  componentDidMount() {
    const { activeConversationId } = this.props;
    this.props.fetchConversationComments(activeConversationId);
  }

  renderComments() {
    const { conversationComments } = this.props;

    if (conversationComments) {
      return (
        <div>
          <ul className="list-style-none">
            { Object.keys(conversationComments).map((commentId) => {
              const { rating, text, user, createdTimeAgo, deleted, edited, flagged, secret } = conversationComments[commentId];

              return (
                <li>
                  <p>{rating}</p>
                  <p><strong>{user.firstName} {user.lastName} {edited ? '(Edited)' : ''} </strong> wrote:</p>
                  <p>{deleted ? '(Deleted)' : text}</p>
                  <p><em>Written <strong>{createdTimeAgo}</strong></em></p>
                  <hr />
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return <h4>lalalala</h4>;
  }

  scrollToForm() {
    this.conversationCommentForm.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { activeConversation } = this.props;

    return (
      <div>
        <div>
          <a href="#" className="back-btn" onClick={this.props.closeConversationCommentList}><i className="fa fa-chevron-left fa-6" aria-hidden="true" /></a>
          <p><strong>{activeConversation.user.firstName} {activeConversation.user.lastName}</strong> wrote:</p>
          <p>{activeConversation.text}</p>
          <hr />
          { activeConversation.deleted ? <p> Adding comments is disabled for deleted conversations.</p> : <button onClick={() => this.scrollToForm()}>Add comment</button>}
        </div>
        {this.renderComments()}
        <div
          ref={(conversationCommentForm) => {
            this.conversationCommentForm = conversationCommentForm;
          }}
        >
          { activeConversation.deleted ? <p> Adding comments is disabled for deleted conversations.</p> : <ConversationCommentFormContainer />}
        </div>

      </div>
    );
  }
  }


ConversationCommentsList.propTypes = {
  activeConversationId: PropTypes.number.isRequired,
  fetchConversationComments: PropTypes.func.isRequired,
  conversationComments: PropTypes.objectOf(Object),
  activeConversation: PropTypes.objectOf(Object).isRequired,
  closeConversationCommentList: PropTypes.func.isRequired,
};

ConversationCommentsList.defaultProps = {
  conversationComments: null,
};

