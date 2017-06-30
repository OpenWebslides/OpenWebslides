import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  addSlide,
  setActiveSlide,
  deleteSlideWithContent,
} from 'actions/slideActions';

import DeckNavigationPane
  from 'presentationals/components/slide-editor/DeckNavigationPane';

function mapStateToProps(state) {
  return {
    slides: state.entities.slides.byId,
    slideSequence: state.app.editor.slides.sequence,
    activeSlide: state.app.editor.slides.active,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addSlide, deleteSlideWithContent, setActiveSlide },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckNavigationPane);
