import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  viewFirstSlide,
  viewPreviousSlide,
  viewNextSlide,
  viewLastSlide,
} from 'actions/app/presentation-view';

import { currentSlideHasCourseNotes } from 'selectors/app/course-note-panel';

import { toggleCourseNotePanel } from 'actions/app/course-note-panel';

import { toggleAnnotationMode } from 'actions/app/annotations';

import PresentationViewToolbar from 'presentationals/components/presentation-view/PresentationViewToolbar';

function mapStateToProps(state) {
  return ({
    annotationMode: state.app.annotations.annotationMode,
    courseNotePanel: state.app.courseNotePanel.showCourseNotePanel,
    currentSlideHasCourseNotes: currentSlideHasCourseNotes(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    viewFirstSlide,
    viewPreviousSlide,
    viewNextSlide,
    viewLastSlide,
    toggleAnnotationMode,
    toggleCourseNotePanel,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationViewToolbar);
