import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDeck } from 'actions/entities/decks';
import { setActiveSlide } from 'actions/app/presentation-view';

import PresentationView from 'presentationals/components/presentation-view/PresentationView';

function mapStateToProps(state) {
  return ({
    activeDeckId: state.app.presentationView.activeDeckId,
    activeSlideId: state.app.presentationView.activeSlideId,
    annotationMode: state.app.annotations.annotationMode,
    courseNotePanel: state.app.courseNotePanel.showCourseNotePanel,
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDeck, setActiveSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationView);
