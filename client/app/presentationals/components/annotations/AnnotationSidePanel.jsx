import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleAnnotationMode, setActiveConversationId } from 'actions/app/annotations';
import { getAnnotationMode } from 'selectors/app/annotations';
import ConversationList from './conversations/ConversationList';
import ConversationPanel from './conversations/ConversationPanel';
import AddConversationPanel from './conversations/AddConversationPanel';


class AnnotationSidePanel extends Component {
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

  toggleAnnotationMode() {
    this.props.toggleAnnotationMode();
  }


  openAddConversationPanel() {
    this.setState({ showConversationPanel: false });
    this.setState({ showAddConversationPanel: true });
  }

  closeAddConversationPanel() {
    this.setState({ showAddConversationPanel: false });
  }

  closeConversationPanel() {
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
        <a href="#" className="close-btn" onClick={() => this.props.toggleAnnotationMode()}>&times;</a>
        <h3><strong>Conversations for current slide</strong></h3>
        <button onClick={this.openAddConversationPanel}>Add conversation</button>
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
