import React from 'react';
import PropTypes from 'prop-types';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';
import { contentItemTypes } from 'constants/contentItemTypes';

import htmlComponents from '../../html-wrappers/components';
import htmlContainers from '../../html-wrappers/containers';

import renderChildrenHOC from '../../hocs/renderChildrenHOC';
import contentItemHOC from '../../hocs/contentItemHOC';

import generateAttributes from '../../helpers/generateAttributes';


function NavigationViewItem(props) {
  const { headingLevel, contentItem, contentItem: { contentItemType, childItemIds, ordered } } = props;

  const attributes = generateAttributes(contentItem);

  if (Object.keys(htmlContainers).includes(contentItemType)) {
    const ContentItemWrapper = htmlContainers[contentItemType];

    const ChildComponents = renderChildrenHOC({ childItemIds, headingLevel, ordered })(NavigationViewItem);

    return (
      <ContentItemWrapper attributes={attributes} ordered={ordered}>
        <ChildComponents />
      </ContentItemWrapper>);
  }


  if (Object.keys(htmlComponents).includes(contentItemType)) {
    const ContentItemComponent = htmlComponents[contentItemType];

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
            <span dangerouslySetInnerHTML={{ __html: getHTMLStringFromInlinePropertiesAndText(inlineProperties, text) }} />
          </ContentItemComponent>
        );
      }

    }
  }
  return <h3>Loading...</h3>;
}


NavigationViewItem.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
  headingLevel: PropTypes.number.isRequired,

};

NavigationViewItem.defaultProps = {
  hasInlineProperties: false,
  textPropName: '',
};

export default contentItemHOC(NavigationViewItem);
