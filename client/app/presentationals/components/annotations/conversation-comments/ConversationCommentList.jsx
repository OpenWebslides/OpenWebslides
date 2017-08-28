import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConversationCommentItem from './ConversationCommentItem';

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
    const { conversationComments, deleteConversationComment, rateConversationComment, setEditableConversationComment, activeConversationId, editableConversationCommentId } = this.props;

    if (conversationComments) {
      return (
        <div>
          <ul className="list-style-none">
            { Object.keys(conversationComments).map((commentId) => {
              const { text } = conversationComments[commentId];

              let component = [];
              if (editableConversationCommentId === commentId) {
                component = (<InlineEditConversationCommentFormContainer
                  form={`ConversationCommentForm${commentId}`}
                  key={commentId}
                  initialValues={{ text }}
                />);
              }
              else {
                component = (
                  <ConversationCommentItem
                    {...conversationComments[commentId]}
                    rateConversationComment={rateConversationComment}
                    setEditableConversationComment={setEditableConversationComment}
                    deleteConversationComment={deleteConversationComment}
                    conversationId={activeConversationId}
                  />);
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

