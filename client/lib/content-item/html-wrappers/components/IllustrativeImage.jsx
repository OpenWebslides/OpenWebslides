import React from 'react';
import PropTypes from 'prop-types';

import { illustrativeImageContentItemShape } from 'constants/propTypeShapes';

export default function IllustrativeImage(props) {
  const { attributes, contentItem: { src, alt, caption, dataId } } = props;

  return (
    <figure>
      <div className="ows-figure-wrapper">
        <div className="ows-figure-image-wrapper" style={{ backgroundImage: `url('${src}')` }}>
          <img {...attributes} src={src} alt={alt} data-id={dataId} />
        </div>
        <figcaption>
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}

IllustrativeImage.propTypes = {
  contentItem: PropTypes.shape(illustrativeImageContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};
