import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Editor } from 'draft-js';

import { fetchSlides, updateSlide } from 'actions/slideActions';

class ActiveContentBlockEditor extends Component {
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
        editorState={this.props.contentBlocks[this.props.id].data}
      />
    );
  }
}

ActiveContentBlockEditor.propTypes = {
  id: PropTypes.number.isRequired,
  updateSlide: PropTypes.func.isRequired,
  contentBlocks: PropTypes.objectOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    slides: state.entities.slides.byId,
    contentBlocks: state.entities.contentBlocks.byId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSlides, updateSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ActiveContentBlockEditor,
);
