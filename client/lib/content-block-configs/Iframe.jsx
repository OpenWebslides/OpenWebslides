import React from 'react';
import PropTypes from 'prop-types';

export default function Iframe(props) {
  const { contentItem } = props;
  if (props.active) {
    return <iframe src={contentItem.src} {...props} />;
  }
  return <p>Iframe Placeholder</p>;
}

Iframe.propTypes = {
  active: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

Iframe.defaultProps = {
  active: false,
};
