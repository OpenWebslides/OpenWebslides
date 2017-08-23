import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConversationListContainer from 'containers/annotations/conversations/ConversationListContainer';
import ConversationFormContainer from 'containers/annotations/conversations/ConversationFormContainer';
import ConversationCommentListContainer from 'containers/annotations/conversation-comments/ConversationCommentListContainer';


export default class AnnotationSidePanel extends Component {
  constructor() {
    super();

    this.openAddConversationPanel = this.openAddConversationPanel.bind(this);
    this.closeAddConversationPanel = this.closeAddConversationPanel.bind(this);
    this.showConversationComments = this.showConversationComments.bind(this);
    this.closeConversationCommentList = this.closeConversationCommentList.bind(this);

    this.state = {
      showAddConversationPanel: false,
      showConversationCommentList: false,
    };
  }
  componentDidMount() {
    this.panel.style.width = '450px';
  }

  openAddConversationPanel() {
    this.setState({ showConversationCommentList: false });
    this.setState({ showAddConversationPanel: true });
  }

  closeAddConversationPanel() {
    this.setState({ showAddConversationPanel: false });
  }

  closeConversationCommentList() {
    this.setState({ showConversationCommentList: false });
  }

  showConversationComments(conversationId) {
    this.props.setActiveConversationId(conversationId);
    this.setState({ showConversationCommentList: true });
  }

  renderContent() {
    if (this.state.showAddConversationPanel) {
      return (
        <ConversationFormContainer closeAddConversationPanel={this.closeAddConversationPanel} />
      );
    }

    if (this.state.showConversationCommentList) {
      return (
        <ConversationCommentListContainer
          closeConversationCommentList={this.closeConversationCommentList}
        />
      );
    }

    return (
      <div>
        <a href="#" className="close-btn" onClick={() => this.props.closeAnnotationMode()}>&times;</a>
        <h3><strong>Conversations for current slide</strong></h3>
        <button onClick={this.openAddConversationPanel}>Add conversation</button>
        <ConversationListContainer showConversationComments={this.showConversationComments} />
      </div>
    );
  }

  render() {
    return (
      <div
        className="side-nav"
        ref={(panel) => {
          this.panel = panel;
        }}
      >
        {this.renderContent()}
      </div>
    );
  }
}

AnnotationSidePanel.propTypes = {
  closeAnnotationMode: PropTypes.func.isRequired,
  setActiveConversationId: PropTypes.func.isRequired,
};
