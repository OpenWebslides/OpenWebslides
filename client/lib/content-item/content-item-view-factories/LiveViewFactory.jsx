import React from 'react';
import PropTypes from 'prop-types';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

import { contentItemTypes } from 'constants/contentItemTypes';

import contentItemFactories from '../content-item-factories/components';
import wrapperFactories from '../content-item-factories/containers';

import renderChildren from '../helpers/renderChildren';


function LiveViewFactory(props) {
  const {
    headingLevel,
    contentItem,
    attributes,
    handleKeyDown,
    slideViewType,
    isFocused,
    hasInlineProperties,
    textPropName,
    contentItem: { contentItemType },
  } = props;

  if (Object.keys(wrapperFactories).includes(contentItemType)) {
    const ContentItemWrapper = wrapperFactories[contentItemType];

    return (
      <ContentItemWrapper attributes={attributes} contentItem={contentItem}>
        {renderChildren(props)}
      </ContentItemWrapper>
    );
  }

  if (Object.keys(contentItemFactories).includes(contentItemType)) {
    const ContentItemComponent = contentItemFactories[contentItemType];
    switch (contentItemType) {
      case contentItemTypes.ILLUSTRATIVE_IMAGE:
      case contentItemTypes.DECORATIVE_IMAGE:
      case contentItemTypes.IFRAME:
        return <ContentItemComponent contentItem={contentItem} attributes={attributes} />;

      default:
        return (
          <ContentItemComponent contentItem={contentItem} attributes={attributes} headingLevel={headingLevel}>
            <ContentEditableContainer
              contentItem={contentItem}
              isFocused={isFocused}
              handleKeyDown={handleKeyDown}
              slideViewType={slideViewType}
              textPropName={textPropName}
              hasInlineProperties={hasInlineProperties}
            />
          </ContentItemComponent>
        );
    }
  }
}

LiveViewFactory.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  headingLevel: PropTypes.number.isRequired,
  slideViewType: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  hasInlineProperties: PropTypes.bool,
  textPropName: PropTypes.string,
};

LiveViewFactory.defaultProps = {
  hasInlineProperties: false,
  textPropName: '',
};

export default LiveViewFactory;
