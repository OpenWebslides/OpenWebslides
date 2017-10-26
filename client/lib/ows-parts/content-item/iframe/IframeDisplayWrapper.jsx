import React from 'react';
import PropTypes from 'prop-types';

import { iframeContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents
  from 'lib/content-item-container/content-item-contents/ContentItemInnerContents';

function IframeDisplayWrapper(props) {
  const { contentItem, attributes, renderOptions, ...passThroughProps } = props;
  let innerContents;

  if (renderOptions.useMediaPlaceholders) {
    innerContents = (
      <p className="ows_iframe__placeholder">
        Placeholder for iframe: {contentItem.alt} ({contentItem.src})
      </p>
    );
  }
  else {
    innerContents = (
      <iframe
        className="ows_iframe__widget"
        src={contentItem.src}
        title={contentItem.alt}
      />
    );
  }

  // #TODO iframe classes
  return (
    <div
      className="ows_iframe"
      {...attributes}
    >
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

IframeDisplayWrapper.propTypes = {
  contentItem: PropTypes.shape(iframeContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  renderOptions: PropTypes.shape({
    useMediaPlaceholders: PropTypes.bool.isRequired,
  }).isRequired,
};

export default IframeDisplayWrapper;
