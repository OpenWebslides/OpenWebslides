import React from 'react';
import PropTypes from 'prop-types';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

import contentItemTypes from '../content-item-factories/components';
import wrapperTypes from '../content-item-factories/containers';

import renderChildren from '../helpers/renderChildren';
import SlideContentViewItem from '../helpers/SlideContentViewItem';

function ContentViewFactory(props) {
  const {
    contentItem,
    contentItem: { contentItemType, ordered },
    handleKeyDown,
    slideViewType,
    isFocused,
    hasInlineProperties,
    textPropName,
  } = props;

  if (Object.keys(wrapperTypes).includes(contentItemType)) {
    let className = 'c_slide-content-view-item__section';

    if (contentItemType === 'LIST') {
      className += ` c_slide-content-view-item__section--${ordered ? 'ordered' : 'unordered'}-list`;
    }

    return (
      <div className={className}>
        {renderChildren(props)}
      </div>
    );
  }

  if (Object.keys(contentItemTypes).includes(contentItemType)) {
    return (
      <SlideContentViewItem contentItem={contentItem} isFocused={isFocused}>
        <ContentEditableContainer
          contentItem={contentItem}
          isFocused={isFocused}
          handleKeyDown={handleKeyDown}
          slideViewType={slideViewType}
          textPropName={textPropName}
          hasInlineProperties={hasInlineProperties}
        />
      </SlideContentViewItem>
    );
  }
}

ContentViewFactory.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  slideViewType: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  hasInlineProperties: PropTypes.bool,
  textPropName: PropTypes.string,
};

ContentViewFactory.defaultProps = {
  hasInlineProperties: false,
  textPropName: '',
};

export default ContentViewFactory;
