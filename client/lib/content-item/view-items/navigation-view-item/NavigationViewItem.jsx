import React from 'react';
import PropTypes from 'prop-types';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';
import { contentItemTypes } from 'constants/contentItemTypes';

import contentItemFactories from '../../content-item-factories/components';
import wrapperFactories from '../../content-item-factories/containers';

import renderChildrenHOC from '../../hoc-wrappers/renderChildrenHOC';

function NavigationViewItem(props) {
  const {
    headingLevel,
    contentItem,
    attributes,
    contentItem: { contentItemType, childItemIds },
  } = props;

  if (Object.keys(wrapperFactories).includes(contentItemType)) {
    const ContentItemWrapper = wrapperFactories[contentItemType];

    const ChildComponents = renderChildrenHOC({ childItemIds, headingLevel })(NavigationViewItem);

    return (
      <ContentItemWrapper attributes={attributes}>
        <ChildComponents />
      </ContentItemWrapper>);
  }


  if (Object.keys(contentItemFactories).includes(contentItemType)) {
    const ContentItemComponent = contentItemFactories[contentItemType];

    switch (contentItemType) {
      case contentItemTypes.ILLUSTRATIVE_IMAGE:
      case contentItemTypes.DECORATIVE_IMAGE:
        return <ContentItemComponent contentItem={contentItem} attributes={attributes} />;

      case contentItemTypes.IFRAME:
        return <p>IFRAME PLACEHOLDER</p>;

      default: {
        const { inlineProperties, text } = contentItem;

        return (
          <ContentItemComponent
            contentItem={contentItem}
            attributes={attributes}
            headingLevel={headingLevel}
          >
            {getHTMLStringFromInlinePropertiesAndText(inlineProperties, text)}
          </ContentItemComponent>
        );
      }

    }
  }
}

NavigationViewItem.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
  headingLevel: PropTypes.number.isRequired,

};

NavigationViewItem.defaultProps = {
  hasInlineProperties: false,
  textPropName: '',
};

export default NavigationViewItem;
