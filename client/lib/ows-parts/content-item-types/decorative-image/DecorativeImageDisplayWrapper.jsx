import React from 'react';
import PropTypes from 'prop-types';

import { decorativeImageContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents
  from 'lib/content-item-container/content-item-contents/ContentItemInnerContents';

function DecorativeImageDisplayWrapper(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <div
      className="ows_decorative-image"
      {...attributes}
    >
      <ContentItemInnerContents
        contentItem={contentItem}
        {...passThroughProps}
      >
        <span className="ows_decorative-image__wrapper">
          <span
            className="ows_decorative-image__background"
            style={{ backgroundImage: `url(${contentItem.src})` }}
          >
            <img
              className="ows_decorative-image__image"
              src={contentItem.src}
              alt={contentItem.alt}
              data-id={contentItem.dataId}
            />
          </span>
        </span>
      </ContentItemInnerContents>
    </div>
  );
}

DecorativeImageDisplayWrapper.propTypes = {
  contentItem: PropTypes.shape(decorativeImageContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DecorativeImageDisplayWrapper;
