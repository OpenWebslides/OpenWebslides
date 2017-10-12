import React from 'react';
import PropTypes from 'prop-types';

import { illustrativeImageContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents from '../content-item-contents/ContentItemInnerContents';

function IllustrativeImage(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <div className="ows-figure">
      <ContentItemInnerContents
        contentItem={contentItem}
        {...passThroughProps}
      >
        <figure>
          <span
            className="ows-image-wrapper"
            style={{ backgroundImage: `url('${contentItem.src}')` }}
          >
            <img
              src={contentItem.src}
              alt={contentItem.alt}
              data-id={contentItem.dataId}
              {...attributes}
            />
          </span>
          <figcaption>
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
