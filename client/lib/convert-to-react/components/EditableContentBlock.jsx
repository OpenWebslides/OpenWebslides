import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import Immutable from 'immutable';

const blockRenderMap = Immutable.Map({
  paragraph: {
    element: 'p',
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

// const getBlockRendererFn = (getEditorState, onChange) => () => ({
//   component: Title,
//   props: {
//     getEditorState,
//     onChange,
//   },
// });

// function LogPlugin(type) {
//   return {
//     initialize: ({ getEditorState }) => {
//       console.log(type);
//       console.log(getEditorState);
//     },
//     blockRendererFn: getBlockRendererFn(),
//   };
// }

// const pluggy = LogPlugin('title');

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
          blockRenderMap={extendedBlockRenderMap}
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
