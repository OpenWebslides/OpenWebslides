import React from 'react';
import PropTypes from 'prop-types';

export default function Image(props) {
  const { attributes, contentItem: { src, altText } } = props;

  return (
    <img {...attributes} src={src} alt={altText} />
  );
}

Image.propTypes = {
  attributes: PropTypes.objectOf(Object).isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};
