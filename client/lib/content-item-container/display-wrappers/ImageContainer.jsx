import React from 'react';
import PropTypes from 'prop-types';

import { imageContainerContentItemShape } from 'constants/propTypeShapes';

import ContainerContentItemChildren from '../content-item-contents/ContainerContentItemChildren';

function ImageContainer(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <div
      className={`ows-image-container has-${contentItem.childItemIds.length}-children`}
      {...attributes}
    >
      <div className="ows-image-container-wrapper">
        <ContainerContentItemChildren
          contentItem={contentItem}
          {...passThroughProps}
        />
      </div>
    </div>
  );
}

ImageContainer.propTypes = {
  contentItem: PropTypes.shape(imageContainerContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ImageContainer;
