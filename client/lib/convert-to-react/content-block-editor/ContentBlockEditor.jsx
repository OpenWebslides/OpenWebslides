import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';

import EditorTypes from 'lib/content-block-configs';

export default class BaseEditor extends Component {
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
    this.props.updateDeck();
  }

  render() {
    const { placeholder, plugins, keyBindings } = EditorTypes[
      this.props.contentBlockType
    ];

    return (
      <div className={`${this.state.hasFocus ? 'hasFocus' : ''}`}>
        <Editor
          ref={component => {
            this.editor = component;
          }}
          placeholder={placeholder || ''}
          plugins={plugins || []}
          keyBindingFn={keyBindings}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          editorState={this.props.contentBlockState}
        />
      </div>
    );
  }
}

BaseEditor.propTypes = {
  id: PropTypes.number.isRequired,
  setActiveContentBlock: PropTypes.func.isRequired,
  activeContentBlock: PropTypes.number,
  updateDeck: PropTypes.func.isRequired,
  updateSlide: PropTypes.func.isRequired,
  contentBlockState: PropTypes.objectOf(Object).isRequired,
  contentBlockType: PropTypes.string.isRequired,
};

BaseEditor.defaultProps = {
  activeContentBlock: null,
};
