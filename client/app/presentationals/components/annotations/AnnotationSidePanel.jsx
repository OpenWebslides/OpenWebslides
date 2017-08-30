import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConversationListContainer from
  'containers/annotations/conversations/ConversationListContainer';

import ConversationPanel from './conversations/ConversationPanel';
import AddConversationPanel from './conversations/AddConversationPanel';

export default class AnnotationSidePanel extends Component {
  constructor() {
    super();

    this.openAddConversationPanel = this.openAddConversationPanel.bind(this);
    this.closeAddConversationPanel = this.closeAddConversationPanel.bind(this);
    this.showConversationPanel = this.showConversationPanel.bind(this);
    this.closeConversationPanel = this.closeConversationPanel.bind(this);

    this.state = {
      showAddConversationPanel: false,
      showConversationPanel: false,
    };
  }

  componentDidMount() {
    this.panel.style.width = '450px';
  }

  openAddConversationPanel() {
    this.setState({ showConversationPanel: false });
    this.setState({ showAddConversationPanel: true });
  }

  closeAddConversationPanel() {
    this.setState({ showAddConversationPanel: false });
  }

  closeConversationPanel() {
    console.log('HELLO');

    this.setState({ showConversationPanel: false });
  }

  showConversationPanel(conversationId) {
    this.props.setActiveConversationId(conversationId);
    this.setState({ showConversationPanel: true });
  }

  renderContent() {
    if (this.state.showAddConversationPanel) {
      return (
        <AddConversationPanel
          closeAddConversationPanel={this.closeAddConversationPanel}
          showConversationPanel={this.showConversationPanel}
        />

      );
    }

    if (this.state.showConversationPanel) {
      return (
        <ConversationPanel
          closeConversationPanel={this.closeConversationPanel}
        />
      );
    }

    return (
      <div>
        <a href="#" className="close-btn" onClick={() => this.props.closeAnnotationMode()}>&times;</a>
        <h3><strong>Conversations for current slide</strong></h3>
        <button onClick={this.openAddConversationPanel}>Add conversation</button>
        <ConversationListContainer showConversationPanel={this.showConversationPanel} />
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
