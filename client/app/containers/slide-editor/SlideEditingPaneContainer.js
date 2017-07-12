import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateSlide } from 'actions/slideActions';
import { addContentBlock } from 'actions/contentBlockActions';

import SlideEditingPane
  from 'presentationals/components/slide-editor/SlideEditingPane';

function mapStateToProps(state) {
  const activeContentBlock = state.app.editor.contentBlocks.active;
  const activeSlideId = parseInt(state.app.editor.slides.active, 10);

  return {
    activeSlideId,
    activeContentBlock: state.entities.contentGroups.byId[activeContentBlock],
    contentGroupSequence: state.app.editor.contentGroups.sequence,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addContentBlock, updateSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideEditingPane);
