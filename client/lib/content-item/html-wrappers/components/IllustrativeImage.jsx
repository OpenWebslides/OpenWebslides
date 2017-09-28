import React from 'react';
import PropTypes from 'prop-types';

export default function IllustrativeImage(
  { attributes, contentItem: { src, altText, caption, dataId } },
) {
  return (
    <figure>
      <div className="ows-figure-wrapper">
        <div className="ows-figure-image-wrapper" style={{ backgroundImage: `url('${src}')` }}>
          <img {...attributes} src={src} alt={altText} data-id={dataId} />
        </div>
        <figcaption>
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}

IllustrativeImage.propTypes = {
  attributes: PropTypes.objectOf(Object).isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};
