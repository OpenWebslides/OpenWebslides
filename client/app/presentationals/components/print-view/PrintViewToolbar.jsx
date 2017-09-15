import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { imgOptions, iframeOptions } from 'constants/printViewOptions';
import SelectImageOptions from './SelectImageOptions';
import SelectIframeOptions from './SelectIframeOptions';
import SelectDecorativeImageOptions from './SelectDecorativeImageOptions';

function PrintViewToolbar({ printViewState, changeImagePref, changeIframePref, changeDecorativeImagePref, id }) {
  const curImagePref = printViewState.images;
  const curDecorativeImagePref = printViewState.decorativeImages;
  const curIframePref = printViewState.iframes;
  return (
    <div className="c_print-view-toolbar">
      <SelectImageOptions changeImagePref={changeImagePref} selectedImagePref={curImagePref} />
      <SelectIframeOptions changeIframePref={changeIframePref} selectedIframePref={curIframePref} />
      <SelectDecorativeImageOptions
        changeDecorativeImagePref={changeDecorativeImagePref}
        selectedDecorativeImagePref={curDecorativeImagePref}
      />
      <Link to={`/printOnly/${id}`}> Print </Link>
    </div>
  );
}

PrintViewToolbar.propTypes = {
  changeImagePref: PropTypes.func.isRequired,
  changeIframePref: PropTypes.func.isRequired,
  changeDecorativeImagePref: PropTypes.func.isRequired,
  printViewState: PropTypes.shape({
    images: PropTypes.oneOf(Object.keys(imgOptions)),
    iframes: PropTypes.oneOf(Object.keys(iframeOptions)),
    decorativeImages: PropTypes.bool,
  }),
};

PrintViewToolbar.defaultProps = {
  printViewState: {
    images: 'IMAGES_AND_TEXT',
    iframes: 'DESCRIPTION',
    decorativeImages: false,
  },
};

export default PrintViewToolbar;
