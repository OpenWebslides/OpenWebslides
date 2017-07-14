import React from 'react';
import PropTypes from 'prop-types';

export default function Iframe(props) {
  const { contentItem } = props;

  return <iframe src={contentItem.src} {...props} />;
}

Iframe.propTypes = {
  contentItem: PropTypes.ObjectOf(Object).isRequired,
};
