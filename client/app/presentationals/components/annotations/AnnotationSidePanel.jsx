import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleAnnotationMode, setActiveConversationId } from 'actions/app/annotations';
import { getAnnotationMode } from 'selectors/app/annotations';
import ConversationList from './conversations/ConversationList';
import ConversationPanel from './conversations/ConversationPanel';
import AddConversationPanel from './conversations/AddConversationPanel';
import PrivateNotePanel from './conversations/PrivateNotePanel';


class AnnotationSidePanel extends Component {
  constructor() {
    super();

    this.openAddConversationPanel = this.openAddConversationPanel.bind(this);
    this.closeAddConversationPanel = this.closeAddConversationPanel.bind(this);
    this.showConversationPanel = this.showConversationPanel.bind(this);
    this.showPrivateNotePanel = this.showPrivateNotePanel.bind(this);
    this.closePrivateNotePanel = this.closePrivateNotePanel.bind(this);
    this.closeConversationPanel = this.closeConversationPanel.bind(this);

    this.state = {
      showPrivateNoteForm: false,
      showAddConversationPanel: false,
      showConversationPanel: false,
      showPrivateNotePanel: false,
    };
  }

  toggleAnnotationMode() {
    this.props.toggleAnnotationMode();
  }


  openAddConversationPanel() {
    this.setState({ showConversationPanel: false });
    this.setState({ showAddConversationPanel: true });
  }

  openPrivateNotePanel() {
    this.setState({ showConversationPanel: false });
    this.setState({ showPrivateNoteForm: true });
  }

  closeAddConversationPanel() {
    this.setState({ showAddConversationPanel: false });
  }

  closePrivateNotePanel() {
    this.setState({ showPrivateNotePanel: false });
  }

  closeConversationPanel() {
    this.setState({ showConversationPanel: false });
  }

  showConversationPanel(conversationId) {
    this.props.setActiveConversationId(conversationId);
    this.setState({ showConversationPanel: true });
  }

  showPrivateNotePanel() {
    this.setState({ showConversationPanel: false });
    this.setState({ showPrivateNotePanel: true });
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

    if (this.state.showPrivateNotePanel) {
      return (
        <PrivateNotePanel
          closePrivateNotePanel={this.closePrivateNotePanel}
        />
      );
    }

    return (
      <div>
        <a href="#" className="close-btn" onClick={() => this.props.toggleAnnotationMode()}>&times;</a>
        <h3><strong>Conversations for current slide</strong></h3>
        <button onClick={this.openAddConversationPanel}>Add conversation</button>
        <button onClick={this.showPrivateNotePanel}>Add private note</button>
        <ConversationList showConversationPanel={this.showConversationPanel} />
      </div>
    );
  }

  render() {
    const { annotationMode } = this.props;

    return (
      <div className={`${annotationMode ? 'visible' : ''} annotations-side-bar`}>
        {this.renderContent()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { annotationMode: getAnnotationMode(state) };
  },
  (dispatch) => {
    return bindActionCreators({ toggleAnnotationMode, setActiveConversationId }, dispatch);
  },
)(AnnotationSidePanel);

AnnotationSidePanel.propTypes = {
  annotationMode: PropTypes.bool.isRequired,
  toggleAnnotationMode: PropTypes.func.isRequired,
  setActiveConversationId: PropTypes.func.isRequired,
};
