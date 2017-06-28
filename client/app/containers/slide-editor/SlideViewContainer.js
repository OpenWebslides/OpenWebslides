import { connect } from 'react-redux';

import SlideView from 'presentationals/components/slide-editor/SlideView';

function mapStateToProps(state) {
  const activeSlide = state.app.editor.slides.active;
  return {
    activeSlide: state.entities.slides.byId[activeSlide],
  };
}

export default connect(mapStateToProps)(SlideView);
