import { connect } from 'react-redux';

import SlideLiveView
  from 'presentationals/components/slide-editor/SlideLiveView';

function mapStateToProps(state) {
  const activeSlide = state.app.editor.slides.active;
  return {
    activeSlide: state.entities.slides.byId[activeSlide],
  };
}

export default connect(mapStateToProps)(SlideLiveView);
