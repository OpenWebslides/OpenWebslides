import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateContentBlock } from 'actions/updateContentBlockActions';

class EmphasizedText extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.updateContentBlock(this.props.contentBlockId);
  }

  render() {
    return (
      <em suppressContentEditableWarning contentEditable>
        {this.props.children}
      </em>
    );
  }
}

EmphasizedText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  updateContentBlock: PropTypes.func.isRequired,
  contentBlockId: PropTypes.integer,
};

EmphasizedText.defaultProps = {
  contentBlockId: '',
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateContentBlock }, dispatch);
}

export default connect(null, mapDispatchToProps)(EmphasizedText);*/

function TextNode(props) {
  return <span data-key="2">{props.children}</span>;
}
Text.propTypes = {
  value: PropTypes.string.isRequired,
};

export default class EditorActivePane extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.editorState.state1 };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput() {
    const domselection = global.getSelection();
    const value = domselection.anchorNode.data;
    this.props.onChange();
  }

  render() {
    return (
      <div contentEditable onInput={this.handleInput}>
        <h1>
          <TextNode>this is wrapped tect</TextNode>
          <em> this is some more text</em>
        </h1>
      </div>
    );
  }
}

EditorActivePane.propTypes = {
  onChange: PropTypes.func.isRequired,
  editorState: PropTypes.objectOf(Object).isRequired,
};
