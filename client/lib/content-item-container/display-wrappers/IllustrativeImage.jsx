import React from 'react';
import PropTypes from 'prop-types';

import { illustrativeImageContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents from '../content-item-contents/ContentItemInnerContents';

function IllustrativeImage(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <div
      className="ows_illustrative-image"
      {...attributes}
    >
      <ContentItemInnerContents
        contentItem={contentItem}
        {...passThroughProps}
      >
        <figure className="ows_illustrative-image__wrapper">
          <span
            className="ows_illustrative-image__background"
            style={{ backgroundImage: `url(${contentItem.src})` }}
          >
            <img
              className="ows_illustrative-image__image"
              src={contentItem.src}
              alt={contentItem.alt}
              data-id={contentItem.dataId}
            />
          </span>
          <figcaption className="ows_illustrative-image__caption">
            {contentItem.caption}
          </figcaption>
        </figure>
      </ContentItemInnerContents>
    </div>
  );
}

IllustrativeImage.propTypes = {
  contentItem: PropTypes.shape(illustrativeImageContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default IllustrativeImage;
