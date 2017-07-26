import React from 'react';
import PropTypes from 'prop-types';

function SelectDecorativeImageOptions({ selectedDecorativeImagePref, changeDecorativeImagePref }) {
  return (
    <p>
      Would you like to display decorative images?
      <input
        type="radio"
        checked={!selectedDecorativeImagePref}
        value="no"
        onChange={() => changeDecorativeImagePref(false)}
      />
      No
      <input
        type="radio"
        checked={selectedDecorativeImagePref}
        value="yes"
        onChange={() => changeDecorativeImagePref(true)}
      />
      Yes
    </p>
  );
}

SelectDecorativeImageOptions.propTypes = {
  selectedDecorativeImagePref: PropTypes.bool,
  changeDecorativeImagePref: PropTypes.func.isRequired,
};

SelectDecorativeImageOptions.defaultProps = {
  selectedDecorativeImagePref: false,
};

export default SelectDecorativeImageOptions;
