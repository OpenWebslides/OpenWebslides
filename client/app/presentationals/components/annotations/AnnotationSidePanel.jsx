import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AnnotationSidePanel extends Component {

  componentDidMount() {
    this.panel.style.width = '400px';
    this.props.fetchConversations();
  }

  render() {
    return (
      <div
        className="side-nav"
        ref={(panel) => {
          this.panel = panel;
        }}
      >
        <a href="#" className="close-btn" onClick={() => this.props.closeAnnotationMode()}>&times;</a>

        <h3>Conversations for current slide</h3>
      </div>
    );
  }
}

AnnotationSidePanel.propTypes = {
  closeAnnotationMode: PropTypes.func.isRequired,
};

