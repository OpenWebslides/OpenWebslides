import React from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes } from 'constants/slideViewTypes';
import { contentItemTypesById, containerContentItemTypes } from 'constants/contentItemTypes';

import SlideContentViewItem from './SlideContentViewItem';

function ContentItem(props) {
  const { contentItem } = props;
  const ContentItemType = contentItemTypesById[contentItem.contentItemType].component[props.slideViewType];

  if (props.slideViewType === slideViewTypes.LIVE) {
    return <ContentItemType {...props} />;
  } else if (props.slideViewType === slideViewTypes.CONTENT) {
    if (Array.indexOf(containerContentItemTypes, contentItem.contentItemType) !== -1) {
      return <ContentItemType {...props} />;
    }
    return (
      <SlideContentViewItem {...props}>
        <ContentItemType {...props} />
      </SlideContentViewItem>
    );
  }
}

ContentItem.propTypes = {
  contentItem: PropTypes.object.isRequired,
  attributes: PropTypes.object,
  headingLevel: PropTypes.number.isRequired,
  editable: PropTypes.bool,
  handleKeyDown: PropTypes.func.isRequired,
};

ContentItem.defaultProps = {
  attributes: {},
  editable: false,
};

export default ContentItem;
