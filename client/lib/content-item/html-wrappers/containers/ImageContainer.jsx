import React from 'react';
import PropTypes from 'prop-types';

export default function ImageContainer({ children, attributes }) {
  return (
    <div className="ows-image-container" {...attributes} >
      {children}
    </div>
  );
}

ImageContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(Object), PropTypes.objectOf(Object)]).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
};
