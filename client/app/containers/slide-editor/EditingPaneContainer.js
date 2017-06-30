import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateSlide } from 'actions/slideActions';
import { addContentBlock } from 'actions/contentBlockActions';

import EditingPane from 'presentationals/components/slide-editor/EditingPane';

function mapStateToProps(state) {
  const activeContentBlock = state.app.editor.contentBlocks.active;
  const activeSlideId = parseInt(state.app.editor.slides.active, 10);

  return {
    activeSlideId,
    activeContentBlock: state.entities.contentBlocks.byId[activeContentBlock],
    contentBlockSequence: state.app.editor.contentBlocks.sequence,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addContentBlock, updateSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingPane);
