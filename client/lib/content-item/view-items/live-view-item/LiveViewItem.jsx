import React from 'react';
import PropTypes from 'prop-types';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

import { contentItemTypes } from 'constants/contentItemTypes';

import htmlComponents from 'lib/content-item/html-wrappers/components';
import htmlContainers from 'lib/content-item/html-wrappers/containers';

import addContentItemTypeProps from 'lib/content-item/helpers/addContentItemTypeProps';
import LiveViewItemContainer from './LiveViewItemContainer';

function LiveViewItem(props) {
  const {
    headingLevel,
    contentItem,
    attributes,
    slideViewType,
    isFocused,
    hasInlineProperties,
    deleteContentItemFromSlide,
    textPropName,
    contentItem: { contentItemType, childItemIds, id, dataId },
    viewType,
    ancestorItemIds,
    slideId,
  } = props;

  if (Object.keys(htmlContainers).includes(contentItemType)) {
    const ContentItemWrapper = htmlContainers[contentItemType];

    return (
      <ContentItemWrapper
        contentItem={contentItem}
        attributes={attributes}
        headingLevel={headingLevel}
      >
        {childItemIds.map(childItemId => (
          <LiveViewItemContainer
            key={childItemId}
            viewType={viewType}
            slideViewType={slideViewType}
            contentItemId={childItemId}
            ancestorItemIds={ancestorItemIds.concat(id)}
            slideId={slideId}
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
        // #TODO: Temporarily removed the deletion-wrapper
        // because it prevented me from properly styling the slide.
        // Wrappers should be added further 'inside' the contentItem
        // where it can't mess up the HTML structure.
        /* return (
          <div className="deletion-wrapper">
            <button
              className="delete-button-live-view"
              onClick={() => deleteContentItemFromSlide(slideId, id, ancestorItemIds, dataId)}
            >X</button>
            <ContentItemComponent
              contentItem={contentItem}
              attributes={attributes}
              {...contentItemTypeProps}
            />
          </div>); */
        return (
          <ContentItemComponent
            contentItem={contentItem}
            attributes={attributes}
            {...contentItemTypeProps}
          />
        );

      default:
        /* return (
          <div className="deletion-wrapper">
            <button
              onClick={() => deleteContentItemFromSlide(slideId, id, ancestorItemIds)}
              className="delete-button-live-view"
            >X</button>
            <ContentItemComponent
              contentItem={contentItem}
              attributes={attributes}
              headingLevel={headingLevel}
            >
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
          </div>
        ); */
        return (
          <ContentItemComponent
            contentItem={contentItem}
            attributes={attributes}
            headingLevel={headingLevel}
          >
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
