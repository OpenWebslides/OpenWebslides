import React from 'react';
import PropTypes from 'prop-types';

export default function DecorativeImage({ attributes, contentItem: { src, altText, dataId } }) {
  return (
    <img {...attributes} src={src} alt={altText} data-id={dataId} />
  );
}

DecorativeImage.propTypes = {
  attributes: PropTypes.objectOf(Object).isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};
