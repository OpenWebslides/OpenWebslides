import React from 'react';
import PropTypes from 'prop-types';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

import { contentItemTypes } from 'constants/contentItemTypes';

import htmlComponents from 'lib/content-item/html-wrappers/components';
import htmlContainers from 'lib/content-item/html-wrappers/containers';

import LiveViewItemContainer from './LiveViewItemContainer';
import addContentItemTypeProps from 'lib/content-item/helpers/addContentItemTypeProps';


function LiveViewItem(props) {
  const {
    headingLevel,
    contentItem,
    attributes,
    slideViewType,
    isFocused,
    hasInlineProperties,
    textPropName,
    contentItem: { contentItemType, childItemIds, id, ordered },
    viewType,
    ancestorItemIds,
    slideId,
  } = props;

  if (Object.keys(htmlContainers).includes(contentItemType)) {
    const ContentItemWrapper = htmlContainers[contentItemType];

    return (
      <ContentItemWrapper attributes={attributes} headingLevel={headingLevel} ordered={ordered}>
        {childItemIds.map(childItemId => (
          <LiveViewItemContainer
            key={childItemId}
            viewType={viewType}
            slideViewType={slideViewType}
            contentItemId={childItemId}
            ancestorItemIds={ancestorItemIds.concat(id)}
            slideId={slideId}
            editable={true}
            headingLevel={headingLevel + 1}
          />))}
      </ContentItemWrapper>
    );
  }

  if (Object.keys(htmlComponents).includes(contentItemType)) {
    const ContentItemComponent = htmlComponents[contentItemType];
    const contentItemTypeProps = addContentItemTypeProps(contentItemType);

    switch (contentItemType) {
      case contentItemTypes.ILLUSTRATIVE_IMAGE:
      case contentItemTypes.DECORATIVE_IMAGE:
      case contentItemTypes.IFRAME:
        return <ContentItemComponent contentItem={contentItem} attributes={attributes} {...contentItemTypeProps} />;

      default:
        return (
          <ContentItemComponent contentItem={contentItem} attributes={attributes} headingLevel={headingLevel}>
            <ContentEditableContainer
              contentItem={contentItem}
              isFocused={isFocused}
              slideViewType={slideViewType}
              textPropName={textPropName}
              slideId={slideId}
              ancestorItemIds={ancestorItemIds}
              hasInlineProperties={hasInlineProperties}
              {...contentItemTypeProps}
            />
          </ContentItemComponent>
        );
    }
  }
}

LiveViewItem.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
  headingLevel: PropTypes.number.isRequired,
  slideViewType: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  hasInlineProperties: PropTypes.bool,
  textPropName: PropTypes.string,
};

LiveViewItem.defaultProps = {
  hasInlineProperties: false,
  textPropName: '',
};

export default LiveViewItem;
