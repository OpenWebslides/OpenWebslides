import React from 'react';
import PropTypes from 'prop-types';

export default function DecorativeImage({ attributes, contentItem: { src, altText, dataId } }) {
  return (
    <div className="ows-decorative-image">
      <div className="ows-decorative-image-wrapper" style={{ backgroundImage: `url('${src}')` }}>
        <img {...attributes} src={src} alt={altText} data-id={dataId} />
      </div>
    </div>
  );
}

DecorativeImage.propTypes = {
  attributes: PropTypes.objectOf(Object).isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};
