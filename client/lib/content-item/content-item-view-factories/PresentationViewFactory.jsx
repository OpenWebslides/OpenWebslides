import React from 'react';
import PropTypes from 'prop-types';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';
import { contentItemTypes } from 'constants/contentItemTypes';

import contentItemFactories from '../content-item-factories/components';
import wrapperFactories from '../content-item-factories/containers';

import renderChildren from '../helpers/renderChildren';


function PresentationViewFactory(props) {
  const {
    headingLevel,
    contentItem,
    attributes,
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

      default: {
        const { inlineProperties, text } = contentItem;

        return (
          <ContentItemComponent
            contentItem={contentItem}
            attributes={attributes}
            headingLevel={headingLevel}
          >
            <span dangerouslySetInnerHTML={{ __html: getHTMLStringFromInlinePropertiesAndText(inlineProperties, text) }} />
          </ContentItemComponent>
        );
      }

    }
  }
}

PresentationViewFactory.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  headingLevel: PropTypes.number.isRequired,
  slideViewType: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  hasInlineProperties: PropTypes.bool,
  textPropName: PropTypes.string,
};

PresentationViewFactory.defaultProps = {
  hasInlineProperties: false,
  textPropName: '',
};

export default PresentationViewFactory;
