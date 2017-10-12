import React from 'react';
import PropTypes from 'prop-types';

import { iframeContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents from '../content-item-contents/ContentItemInnerContents';

function Iframe(props) {
  const { contentItem, attributes, renderOptions, ...passThroughProps } = props;
  let innerContents;

  if (renderOptions.useMediaPlaceholders) {
    innerContents = (
      <p>Placeholder for iframe: {contentItem.alt} ({contentItem.src})</p>
    );
  }
  else {
    innerContents = (
      <iframe
        src={contentItem.src}
        title={contentItem.alt}
        {...attributes}
      />
    );
  }

  // #TODO iframe classes
  return (
    <div className="ows-iframe">
      <ContentItemInnerContents
        contentItem={contentItem}
        renderOptions={renderOptions}
        {...passThroughProps}
      >
        {innerContents}
      </ContentItemInnerContents>
    </div>
  );
}

Iframe.propTypes = {
  contentItem: PropTypes.shape(iframeContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  renderOptions: PropTypes.shape({
    useMediaPlaceholders: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Iframe;
