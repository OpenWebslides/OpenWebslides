import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlideConversationListContainer from 'containers/annotations/SlideConversationListContainer';
import AddConversationPanelContainer from 'containers/annotations/AddConversationPanelContainer';


export default class AnnotationSidePanel extends Component {
  constructor() {
    super();

    this.openAddConversationPanel = this.openAddConversationPanel.bind(this);
    this.closeAddConversationPanel = this.closeAddConversationPanel.bind(this);

    this.state = {
      showAddConversationPanel: false,
    };
  }
  componentDidMount() {
    this.panel.style.width = '450px';
    this.props.fetchConversations();
  }

  openAddConversationPanel() {
    this.setState({ showAddConversationPanel: true });
  }

  closeAddConversationPanel() {
    this.setState({ showAddConversationPanel: false });
  }

  renderContent() {
    if (this.state.showAddConversationPanel) {
      return (
        <AddConversationPanelContainer closeAddConversationPanel={this.closeAddConversationPanel} />
      );
    }
    else {
      return (
        <div>
          <a href="#" className="close-btn" onClick={() => this.props.closeAnnotationMode()}>&times;</a>
          <h3><strong>Conversations for current slide</strong></h3>
          <button onClick={this.openAddConversationPanel}>Add conversation</button>
          <SlideConversationListContainer />
        </div>

      );
    }
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
};

AnnotationSidePanel.propTypes = {
  fetchConversations: PropTypes.func.isRequired,
}
;
