import React from 'react';
import PropTypes from 'prop-types';

export default function Image(props) {
  const { contentItem } = props;

  return <img src={contentItem.src} {...props} alt={contentItem.altText} />;
}

Image.propTypes = {
  contentItem: PropTypes.ObjectOf(Object).isRequired,
};
