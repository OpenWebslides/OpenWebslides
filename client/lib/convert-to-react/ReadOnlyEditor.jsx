import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Editor } from 'draft-js';

import { fetchSlides, updateSlide } from 'actions/slideActions';

function ReadOnlyEditor(props) {
  const { contentBlocks, id } = props;
  return <Editor readOnly editorState={contentBlocks[id].data} />;
}

ReadOnlyEditor.propTypes = {
  id: PropTypes.number.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyEditor);
