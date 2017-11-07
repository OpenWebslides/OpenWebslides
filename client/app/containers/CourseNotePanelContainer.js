import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleCourseNotePanel } from 'actions/app/course-note-panel';
import { getCourseNotesForActiveSlide } from 'selectors/app/course-note-panel';

import CourseNotePanel from 'presentationals/components/course-note-panel/CourseNotePanel';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { toggleCourseNotePanel },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    showCourseNotePanel: state.app.courseNotePanel.showCourseNotePanel,
    courseNotesForCurrentSlide: getCourseNotesForActiveSlide(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseNotePanel);
