import React from 'react';
import PropTypes from 'prop-types';

export default function Image(props) {
  const { contentItem } = props;

  return <img src={contentItem.src} alt={contentItem.altText} />;
}

Image.propTypes = {
  editable: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

Image.defaultProps = {
  editable: false,
};
