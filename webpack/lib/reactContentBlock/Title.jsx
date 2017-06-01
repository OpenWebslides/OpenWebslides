import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateContentBlock } from 'actions/updateContentBlockActions';

class Title extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // handleChange() {
  //   const domSelection = global.getSelection();
  //   // this.props.updateContentBlock(this.props.contentBlockId);
  // }

  render() {
    return (
      <h1
        data-key={this.props.contentBlockId}
        contentEditable
        onInput={this.handleChange}
        onSelect={this.handleChange}
        onBlur={this.handleChange}
        suppressContentEditableWarning
      >
        {this.props.children}
      </h1>
    );
  }
}

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  // updateContentBlock: PropTypes.func.isRequired,
  contentBlockId: PropTypes.integer,
};

Title.defaultProps = {
  contentBlockId: '',
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateContentBlock }, dispatch);
}

export default connect(null, mapDispatchToProps)(Title);
