import React from 'react';
import PropTypes from 'prop-types';
import { imgOptionsText, iframeOptionsText } from 'constants/printViewOptions';
import SelectImageOptions from './SelectImageOptions';
import SelectIframeOptions from './SelectIframeOptions';

function PrintViewToolbar({
  selectedImagePref,
  changeImagePref,
  selectedIframePref,
  changeIframePref,
}) {
  return (
    <div className="c_print-view-toolbar">
      <SelectImageOptions
        changeImagePref={changeImagePref}
        selectedImagePref={selectedImagePref}
      />
      <SelectIframeOptions
        changeIframePref={changeIframePref}
        selectedIframePref={selectedIframePref}
      />
    </div>
  );
}

PrintViewToolbar.propTypes = {
  selectedImagePref: PropTypes.oneOf(Object.keys(imgOptionsText)),
  changeImagePref: PropTypes.func.isRequired,
  selectedIframePref: PropTypes.oneOf(Object.keys(iframeOptionsText)),
  changeIframePref: PropTypes.func.isRequired,
};

PrintViewToolbar.defaultProps = {
  selectedImagePref: 'IMAGES_AND_TEXT',
  selectedIframePref: 'DESCRIPTION',
};

export default PrintViewToolbar;
