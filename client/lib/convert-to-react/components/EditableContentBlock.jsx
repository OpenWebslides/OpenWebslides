import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';

export default class EditableContentBlock extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(editorState) {
    this.props.updateSlide(this.props.id, editorState);
  }

  render() {
    return (
      <Editor
        onChange={this.handleChange}
        editorState={this.props.contentBlock.data}
      />
    );
  }
}

EditableContentBlock.propTypes = {
  id: PropTypes.number.isRequired,
  updateSlide: PropTypes.func.isRequired,
  contentBlock: PropTypes.objectOf(Object).isRequired,
};
