import Immutable from 'seamless-immutable';

import { TOGGLE_COURSE_NOTE_PANEL } from 'actions/app/course-note-panel';

const initialState = Immutable({
  showCourseNotePanel: false,
});

export default function courseNotePanelReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_COURSE_NOTE_PANEL: {
      return state.merge({ showCourseNotePanel: !state.showCourseNotePanel });
    }
    default:
      return state;
  }
}
