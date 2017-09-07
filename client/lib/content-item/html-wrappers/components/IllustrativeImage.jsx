import React from 'react';
import PropTypes from 'prop-types';

export default function IllustrativeImage(
  { attributes, contentItem: { src, altText, caption, dataId } },
) {
  return (
    <figure>
      <img {...attributes} src={src} alt={altText} data-id={dataId} />
      <figcaption>
        {caption}
      </figcaption>
    </figure>
  );
}

IllustrativeImage.propTypes = {
  attributes: PropTypes.objectOf(Object).isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};
