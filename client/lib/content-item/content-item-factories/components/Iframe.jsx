import React from 'react';
import PropTypes from 'prop-types';

export default function Iframe({ attributes, contentItem: { src } }) {
  return (
    <iframe {...attributes} src={src} />
  );
}

Iframe.propTypes = {
  attributes: PropTypes.objectOf(Object).isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};
