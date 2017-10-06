import React from 'react';
import PropTypes from 'prop-types';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';
import { contentItemTypes } from 'constants/contentItemTypes';

import htmlComponents from 'lib/content-item/html-wrappers/components';
import htmlContainers from 'lib/content-item/html-wrappers/containers';

import contentItemHOC from 'lib/content-item/hocs/contentItemHOC';
import renderChildrenHOC from 'lib/content-item/hocs/renderChildrenHOC';

import generateAttributes from '../../helpers/generateAttributes';

function PresentationViewItem(props) {
  const {
    headingLevel,
    contentItem,
    contentItem: { contentItemType, childItemIds },
  } = props;

  const attributes = generateAttributes(contentItem);


  if (Object.keys(htmlContainers).includes(contentItemType)) {
    const ContentItemWrapper = htmlContainers[contentItemType];

    const ChildComponents = renderChildrenHOC({
      childItemIds,
      headingLevel,
    })(PresentationViewItem);

    return (
      <ContentItemWrapper
        contentItem={contentItem}
        attributes={attributes}
      >
        <ChildComponents />
      </ContentItemWrapper>);
  }


  if (Object.keys(htmlComponents).includes(contentItemType)) {
    const ContentItemComponent = htmlComponents[contentItemType];

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
            <span
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: getHTMLStringFromInlinePropertiesAndText(inlineProperties, text),
              }}
            />
          </ContentItemComponent>
        );
      }

    }
  }
}

PresentationViewItem.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
  headingLevel: PropTypes.number.isRequired,
};

PresentationViewItem.defaultProps = {
  hasInlineProperties: false,
  textPropName: '',
};

export default contentItemHOC(PresentationViewItem);
