import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';

export default class EditableContentBlock extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      hasFocus: false,
    };
  }

  componentDidMount() {
    if (this.props.activeContentBlock === this.props.id) {
      this.editor.focus();
    }
  }

  handleChange(editorState) {
    this.props.updateSlide(this.props.id, editorState);
  }

  handleFocus() {
    this.setState({ hasFocus: true });
    this.props.setActiveContentBlock(this.props.id);
  }

  handleBlur() {
    this.setState({ hasFocus: false });
    this.props.setActiveContentBlock(null);
  }

  render() {
    return (
      <div className={`${this.state.hasFocus ? 'hasFocus' : ''}`}>
        <Editor
          ref={el => {
            this.editor = el;
          }}
          placeholder="Add your text here..."
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          editorState={this.props.contentBlockState}
        />
      </div>
    );
  }
}

EditableContentBlock.propTypes = {
  id: PropTypes.number.isRequired,
  setActiveContentBlock: PropTypes.func.isRequired,
  activeContentBlock: PropTypes.number,
  updateSlide: PropTypes.func.isRequired,
  contentBlockState: PropTypes.objectOf(Object).isRequired,
};

EditableContentBlock.defaultProps = {
  activeContentBlock: null,
};
