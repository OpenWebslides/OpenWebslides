import React from 'react';
import PropTypes from 'prop-types';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

import htmlComponents from '../../html-wrappers/components';
import htmlContainers from '../../html-wrappers/containers';

import SlideContentViewItem from './SlideContentViewItem';
import ContentViewItemContainer from './ContentViewItemContainer';
import addContentItemTypeProps from 'lib/content-item/helpers/addContentItemTypeProps';

function ContentViewItem(props) {
  const {
    contentItem,
    contentItem: { contentItemType, ordered, childItemIds, id },
    slideViewType,
    isFocused,
    hasInlineProperties,
    textPropName,
    headingLevel,
    viewType,
    ancestorItemIds,
    slideId,
    handleDirectionButtonClick,
  } = props;

  if (Object.keys(htmlContainers).includes(contentItemType)) {
    let className = 'c_slide-content-view-item__section';

    if (contentItemType === 'LIST') {
      className += ` c_slide-content-view-item__section--${ordered ? 'ordered' : 'unordered'}-list`;
    }

    return (
      <div className={className}>
        {childItemIds.map(childItemId => (
          <ContentViewItemContainer
            key={childItemId}
            viewType={viewType}
            slideViewType={slideViewType}
            contentItemId={childItemId}
            ancestorItemIds={ancestorItemIds.concat(id)}
            slideId={slideId}
            editable={true}
            headingLevel={headingLevel + 1}
          />))}
      </div>
    );
  }

  if (Object.keys(htmlComponents).includes(contentItemType)) {
    const contentItemTypeProps = addContentItemTypeProps(contentItemType);

    return (
      <SlideContentViewItem
        contentItem={contentItem}
        isFocused={isFocused}
        handleDirectionButtonClick={handleDirectionButtonClick}
        slideId={slideId}
        ancestorItemIds={ancestorItemIds}
      >
        <ContentEditableContainer
          contentItem={contentItem}
          isFocused={isFocused}
          slideViewType={slideViewType}
          textPropName={textPropName}
          hasInlineProperties={hasInlineProperties}
          slideId={slideId}
          ancestorItemIds={ancestorItemIds}
          {...contentItemTypeProps}
        />
      </SlideContentViewItem>
    );
  }
}

ContentViewItem.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
  slideViewType: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  hasInlineProperties: PropTypes.bool,
  textPropName: PropTypes.string,
  handleDirectionButtonClick: PropTypes.func.isRequired,
};

ContentViewItem.defaultProps = {
  hasInlineProperties: false,
  textPropName: '',
};

export default ContentViewItem;
