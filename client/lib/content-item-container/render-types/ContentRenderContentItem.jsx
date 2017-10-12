import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { contentItemTypes, containerContentItemTypes } from 'constants/contentItemTypes';
import { contentItemShape } from 'constants/propTypeShapes';

import ContainerContentItemChildren from '../content-item-contents/ContainerContentItemChildren';
import ContentItemInnerContents from '../content-item-contents/ContentItemInnerContents';
import ContentRenderWrapper from './content-render/ContentRenderWrapper';

const contentItemTypesToTextPropOptionsMap = {
  [contentItemTypes.TITLE]: [
    {
      textPropTitle: '',
      textPropName: 'text',
      hasInlineProperties: true,
      deleteOnBackspace: true,
    },
  ],
  [contentItemTypes.PARAGRAPH]: [
    {
      textPropTitle: '',
      textPropName: 'text',
      hasInlineProperties: true,
      deleteOnBackspace: true,
    },
  ],
  [contentItemTypes.LIST_ITEM]: [
    {
      textPropTitle: '',
      textPropName: 'text',
      hasInlineProperties: true,
      deleteOnBackspace: true,
    },
  ],
  [contentItemTypes.ILLUSTRATIVE_IMAGE]: [
    {
      textPropTitle: 'URL',
      textPropName: 'src',
      hasInlineProperties: false,
      deleteOnBackspace: true,
      contentEditableOptions: {
        isSingleLine: true,
      },
    },
    {
      textPropTitle: 'Alt',
      textPropName: 'alt',
      hasInlineProperties: false,
    },
    {
      textPropTitle: 'Caption',
      textPropName: 'caption',
      hasInlineProperties: false,
    },
  ],
  [contentItemTypes.DECORATIVE_IMAGE]: [
    {
      textPropTitle: 'URL',
      textPropName: 'src',
      hasInlineProperties: false,
      deleteOnBackspace: true,
      contentEditableOptions: {
        isSingleLine: true,
      },
    },
    {
      textPropTitle: 'Alt',
      textPropName: 'alt',
      hasInlineProperties: false,
    },
  ],
  [contentItemTypes.IFRAME]: [
    {
      textPropTitle: 'URL',
      textPropName: 'src',
      hasInlineProperties: false,
      deleteOnBackspace: true,
      contentEditableptions: {
        isSingleLine: true,
      },
    },
    {
      textPropTitle: 'Alt',
      textPropName: 'alt',
      hasInlineProperties: false,
    },
  ],
};

function renderContainer(contentItem, passThroughProps) {
  let className = 'c_slide-content-view-item__section';

  if (contentItem.contentItemType === contentItemTypes.LIST) {
    className += ` c_slide-content-view-item__section--${contentItem.ordered ? 'ordered' : 'unordered'}-list`;
  }

  return (
    <div className={className}>
      <ContainerContentItemChildren
        contentItem={contentItem}
        {...passThroughProps}
      />
    </div>
  );
}

function renderItem(contentItem, passThroughProps) {
  return (
    <ContentRenderWrapper
      contentItem={contentItem}
      {...passThroughProps}
    >
      <ContentItemInnerContents
        contentItem={contentItem}
        {...passThroughProps}
        textPropOptions={contentItemTypesToTextPropOptionsMap[contentItem.contentItemType]}
      />
    </ContentRenderWrapper>
  );
}

function ContentRenderContentItem(props) {
  const { contentItem, ...passThroughProps } = props;
  let renderContentItem;

  if (_.includes(containerContentItemTypes, contentItem.contentItemType)) {
    renderContentItem = renderContainer(contentItem, passThroughProps);
  }
  else {
    renderContentItem = renderItem(contentItem, passThroughProps);
  }

  return renderContentItem;
}

ContentRenderContentItem.propTypes = {
  contentItem: PropTypes.shape(contentItemShape).isRequired,
};

export default ContentRenderContentItem;
