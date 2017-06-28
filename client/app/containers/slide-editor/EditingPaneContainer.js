import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateSlide } from 'actions/slideActions';
import { addTitle } from 'actions/contentBlockActions';

import EditingPane from 'presentationals/components/editor/EditingPane';

function mapStateToProps(state) {
  const activeContentBlock = state.app.editor.contentBlocks.active;
  return {
    activeSlideId: state.app.editor.slides.active,
    activeContentBlock: state.entities.contentBlocks.byId[activeContentBlock],
    contentBlockSequence: state.app.editor.contentBlocks.sequence,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTitle, updateSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingPane);
