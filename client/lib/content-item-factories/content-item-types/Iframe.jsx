import React from 'react';
import PropTypes from 'prop-types';

export default function Iframe(props) {
  const { attributes, contentItem: { src } } = props;

  return (
    <iframe {...attributes} src={src} />
  );
}

Iframe.propTypes = {
  attributes: PropTypes.objectOf(Object).isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};
