import React from 'react';
import PropTypes from 'prop-types';

import { imageContainerContentItemShape } from 'constants/propTypeShapes';

export default function ImageContainer(props) {
  const { children, attributes, contentItem } = props;

  return (
    <div className={`ows-image-container has-${contentItem.childItemIds.length}-children`}>
      <div className="ows-image-container-wrapper" {...attributes}>
        {children}
      </div>
    </div>
  );
}

ImageContainer.propTypes = {
  contentItem: PropTypes.shape(imageContainerContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};
