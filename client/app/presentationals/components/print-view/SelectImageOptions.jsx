import React from 'react';
import PropTypes from 'prop-types';
import { imgOptionsText } from 'constants/printViewOptions';

function imgOptions() {
  return Object.keys(imgOptionsText).map(type =>
    <option key={type} value={type}> {imgOptionsText[type]} </option>,
  );
}

function SelectImageOptions({ selectedImagePref, changeImagePref }) {
  return (
    <p>
      Choose image behaviour:
      <select
        key={selectedImagePref}
        value={selectedImagePref}
        onChange={e => {
          const target = e.target.value;
          return changeImagePref(target);
        }}
      >
        {imgOptions()}
      </select>
    </p>
  );
}

SelectImageOptions.propTypes = {
  selectedImagePref: PropTypes.oneOf(Object.keys(imgOptionsText)),
  changeImagePref: PropTypes.func.isRequired,
};

SelectImageOptions.defaultProps = {
  selectedImagePref: 'IMAGES_AND_TEXT',
};

export default SelectImageOptions;
