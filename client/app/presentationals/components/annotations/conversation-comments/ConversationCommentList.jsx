import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConversationCommentFormContainer from 'containers/annotations/conversation-comments/ConversationCommentFormContainer';
import InlineEditConversationCommentFormContainer from 'containers/annotations/conversation-comments/InlineEditConversationCommentFormContainer';
import InlineEditConversationFormContainer from 'containers/annotations/conversation-comments/InlineEditConversationFormContainer';


export default class ConversationCommentsList extends Component {
  constructor() {
    super();

    this.scrollToForm = this.scrollToForm.bind(this);
  }

  componentDidMount() {
    const { activeConversationId } = this.props;
    this.props.fetchConversationComments(activeConversationId);
  }

  scrollToForm() {
    this.conversationCommentForm.scrollIntoView({ behavior: 'smooth' });
  }

  renderCommentList() {
    const { conversationComments, activeConversationId, editableConversationCommentId } = this.props;

    if (conversationComments) {
      return (
        <div>
          <ul className="list-style-none">
            { Object.keys(conversationComments).map((commentId) => {
              const { rating, text, rated, user, createdTimeAgo, byCurrentUser, deleted, edited, flagged, secret } = conversationComments[commentId];

              let component = [];
              if (editableConversationCommentId === commentId) {
                component = (<InlineEditConversationCommentFormContainer
                  form={`ConversationCommentForm${commentId}`}
                  key={commentId}
                  initialValues={{ text }}
                />);
              }
              else {
                let RateButton;
                if (rated) {
                  RateButton = <button onClick={() => this.props.rateConversationComment(commentId, rated)}>Take the star awaaay!</button>;
                }
                else {
                  RateButton = <button onClick={() => this.props.rateConversationComment(commentId, rated)}>Give a star!</button>;
                }
                component = (
                  <div>
                    <p>Rating: {rating} {RateButton}</p>
                    <span>{byCurrentUser && !deleted && <div><button onClick={() => this.props.setEditableConversationComment(commentId)}>Edit</button><button onClick={() => this.props.deleteConversationComment(commentId, activeConversationId)}>Delete</button></div>}</span>
                    <p><strong>{user.firstName} {user.lastName} {edited ? '(Edited)' : ''} </strong> wrote:</p>
                    <p>{deleted ? '(Deleted)' : text}</p>
                    <p><em>Written <strong>{createdTimeAgo}</strong></em></p>
                  </div>
                  );
              }

              return (
                <li key={commentId}>
                  {component}
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

  render() {
    const { activeConversation, editingConversation } = this.props;

    let conversation;
    if (editingConversation) {
      const { title, text, conversationType } = activeConversation;

      conversation = <InlineEditConversationFormContainer initialValues={{ title, text, conversationType }} />;
    }
    else {
      conversation = (
        <div><a href="#" className="back-btn" onClick={this.props.closeConversationCommentList}><i className="fa fa-chevron-left fa-6" aria-hidden="true" /></a>
          <p><strong>{activeConversation.user.firstName} {activeConversation.user.lastName}</strong> wrote:</p>
          <h3>{activeConversation.title}</h3>
          <p>{activeConversation.text}</p>
          {activeConversation.byCurrentUser && !activeConversation.deleted && <button onClick={this.props.setEditingConversation}>Edit</button>}
          { activeConversation.deleted ? <p> Adding comments is disabled for deleted conversations.</p> : <button onClick={() => this.scrollToForm()}>Add comment</button>}
        </div>);
    }
    return (
      <div>
        {conversation}
        <hr />
        {this.renderCommentList()}
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
  activeConversationId: PropTypes.string.isRequired,
  fetchConversationComments: PropTypes.func.isRequired,
  rateConversationComment: PropTypes.func.isRequired,
  editableConversationCommentId: PropTypes.string,
  setEditableConversationComment: PropTypes.func.isRequired,
  deleteConversationComment: PropTypes.func.isRequired,
  conversationComments: PropTypes.objectOf(Object),
  activeConversation: PropTypes.objectOf(Object).isRequired,
  closeConversationCommentList: PropTypes.func.isRequired,
};

ConversationCommentsList.defaultProps = {
  conversationComments: null,
  editableConversationCommentId: null,
};

