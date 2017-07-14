import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateSlide } from 'actions/slideActions';
import { addContentBlock } from 'actions/contentBlockActions';

import SlideEditingPane from 'presentationals/components/slide-editor/SlideEditingPane';

function mapStateToProps(state) {
  const activeContentBlock = state.app.editor.contentItems.active;

  return {
    activeSlideId: state.app.editor.slides.active,
    activeContentBlock: state.entities.contentItems.byId[activeContentBlock],
    contentItemSequence: state.app.editor.contentItems.sequence,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addContentBlock, updateSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideEditingPane);
