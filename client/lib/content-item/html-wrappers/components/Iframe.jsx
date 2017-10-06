import React from 'react';
import PropTypes from 'prop-types';

import { iframeContentItemShape } from 'constants/propTypeShapes';

export default function Iframe(props) {
  const { attributes, contentItem: { src, alt } } = props;

  return (
    <iframe {...attributes} src={src} title={alt} />
  );
}

Iframe.propTypes = {
  contentItem: PropTypes.shape(iframeContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};
