import { connect } from 'react-redux';

import SlideView from 'presentationals/components/editor/SlideView';

function mapStateToProps(state) {
  return {
    activeSlide: state.app.editor.activeSlide,
    slides: state.entities.slides.byId,
    contentBlocks: state.entities.contentBlocks.byId,
  };
}

export default connect(mapStateToProps)(SlideView);
