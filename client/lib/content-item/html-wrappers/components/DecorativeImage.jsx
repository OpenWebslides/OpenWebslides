import React from 'react';
import PropTypes from 'prop-types';

import { decorativeImageContentItemShape } from 'constants/propTypeShapes';

export default function DecorativeImage(props) {
  const { attributes, contentItem: { src, alt, dataId } } = props;

  return (
    <div className="ows-decorative-image">
      <div className="ows-decorative-image-wrapper" style={{ backgroundImage: `url('${src}')` }}>
        <img {...attributes} src={src} alt={alt} data-id={dataId} />
      </div>
    </div>
  );
}

DecorativeImage.propTypes = {
  contentItem: PropTypes.shape(decorativeImageContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};
