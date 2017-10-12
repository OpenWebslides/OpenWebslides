import React from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes } from 'constants/slideViewTypes';
import { contentItemRenderTypes } from 'constants/contentItemRenderTypes';
import { contentItemShape } from 'constants/propTypeShapes';

import renderTypesIndex from './render-types';

const slideViewTypeToRenderTypeAndOptionsMap = {
  [slideViewTypes.CONTENT]: {
    renderType: contentItemRenderTypes.CONTENT,
    renderOptions: {
      isEditable: true,
    },
  },
  [slideViewTypes.LIVE]: {
    renderType: contentItemRenderTypes.DISPLAY,
    renderOptions: {
      useMediaPlaceholders: false,
      isEditable: true,
    },
  },
  [slideViewTypes.PRESENTATION]: {
    renderType: contentItemRenderTypes.DISPLAY,
    renderOptions: {
      useMediaPlaceholders: false,
      isEditable: false,
    },
  },
  [slideViewTypes.NAVIGATION]: {
    renderType: contentItemRenderTypes.DISPLAY,
    renderOptions: {
      useMediaPlaceholders: true,
      isEditable: false,
    },
  },
};

function ContentItem(props) {
  const { slideViewType } = props;
  const { renderType, renderOptions } = slideViewTypeToRenderTypeAndOptionsMap[slideViewType];
  const RenderTypeComponent = renderTypesIndex[renderType];

  return (
    <RenderTypeComponent
      {...props}
      renderOptions={renderOptions}
    />
  );
}

ContentItem.propTypes = {
  contentItem: PropTypes.shape(contentItemShape).isRequired,
  slideViewType: PropTypes.oneOf(Object.values(slideViewTypes)).isRequired,
};

export default ContentItem;
