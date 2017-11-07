import React from 'react';
import PropTypes from 'prop-types';

export default function CourseNotePanel({ showCourseNotePanel, toggleCourseNotePanel, courseNotesForCurrentSlide }) {
  return (
    <div className={`${showCourseNotePanel ? 'visible' : ''} annotations-side-bar`}>
      <div>
        <button className="close-btn" onClick={() => toggleCourseNotePanel()}>
          <i className={'fa fa-times'} aria-hidden="true" />
        </button>

        <h3 className="panel-title">
          <strong>Course Notes for current slide</strong>
        </h3>
        <hr className="delimiter" />
        {courseNotesForCurrentSlide.map((note) => {
          return <p>{note}</p>;
        })}
      </div>
    </div>
  );
}

CourseNotePanel.propTypes = {
  showCourseNotePanel: PropTypes.bool.isRequired,
  toggleCourseNotePanel: PropTypes.func.isRequired,
};


