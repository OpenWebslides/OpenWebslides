import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateContentBlock } from 'actions/updateContentBlockActions';

/* class ContentEditable extends Component {
  componentDidUpdate() {
    if (this.props.html !== this.getDOMNode().innerHTML) {
      this.getDOMNode().innerHTML = this.props.html;
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.getDOMNode().innerHTML;
  }

  render() {
    return (
      <div
        id="contenteditable"
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
    );
  }

  emitChange() {
    var html = this.getDOMNode().innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html,
        },
      });
    }
    this.lastHtml = html;
  }
});*/

class Title extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event);
    this.props.updateContentBlock(this.props.contentBlockId);
  }

  render() {
    return (
      <h1
        onInput={this.handleChange}
        onBlur={this.handleChange}
        suppressContentEditableWarning
        contentEditable
      >
        {this.props.children}
      </h1>
    );
  }
}

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  updateContentBlock: PropTypes.func.isRequired,
  contentBlockId: PropTypes.integer,
};

Title.defaultProps = {
  contentBlockId: '',
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateContentBlock }, dispatch);
}

export default connect(null, mapDispatchToProps)(Title);
