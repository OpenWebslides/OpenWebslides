import React from 'react';
import PropTypes from 'prop-types';

import { imageContainerContentItemShape } from 'constants/propTypeShapes';

import ContainerContentItemChildren
  from 'lib/content-item-container/content-item-contents/ContainerContentItemChildren';

function ImageContainerDisplayWrapper(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <div
      className={`ows_image-container ows_image-container--children-count-${contentItem.childItemIds.length}`}
      {...attributes}
    >
      <div className="ows_image-container__wrapper">
        <ContainerContentItemChildren
          contentItem={contentItem}
          {...passThroughProps}
        />
      </div>
    </div>
  );
}

ImageContainerDisplayWrapper.propTypes = {
  contentItem: PropTypes.shape(imageContainerContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ImageContainerDisplayWrapper;
