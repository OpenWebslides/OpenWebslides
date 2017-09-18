import React from 'react';
import PropTypes from 'prop-types';
import { annotationsOptionsText } from 'constants/printViewOptions';

function annotationsOptions() {
  return Object.keys(annotationsOptionsText).map(type =>
    <option key={type} value={type}> {annotationsOptionsText[type]} </option>,
  );
}

function SelectAnnotationsOptions({ selectedAnnotationsPref, changeAnnotationsPref }) {
  return (
    <p>
      How do you want to display other people{'\''}s annotations?
      <select
        key={selectedAnnotationsPref}
        value={selectedAnnotationsPref}
        onChange={(e) => {
          const target = e.target.value;
          return changeAnnotationsPref(target);
        }}
      >
        {annotationsOptions()}
      </select>
    </p>
  );
}

SelectAnnotationsOptions.propTypes = {
  selectedAnnotationsPref: PropTypes.oneOf(Object.keys(annotationsOptionsText)),
  changeAnnotationsPref: PropTypes.func.isRequired,
};

SelectAnnotationsOptions.defaultProps = {
  selectedAnnotationsPref: 'INLINE',
};

export default SelectAnnotationsOptions;
