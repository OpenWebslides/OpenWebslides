import React from 'react';
import PropTypes from 'prop-types';

export default function ImageContainer({ children, attributes, contentItem }) {
  return (
    <div className={`ows-image-container has-${contentItem.childItemIds.length}-children`} {...attributes} >
      {children}
    </div>
  );
}

ImageContainer.propTypes = {
  contentItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    childItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(Object), PropTypes.objectOf(Object)]).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
};
