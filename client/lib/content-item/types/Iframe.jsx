import React from 'react';
import PropTypes from 'prop-types';

export default function Iframe(props) {
  const { contentItem } = props;
  if (props.editable) {
    return <iframe src={contentItem.src} />;
  }
  return <p>[Iframe Placeholder]</p>;
}

Iframe.propTypes = {
  editable: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

Iframe.defaultProps = {
  editable: false,
};
