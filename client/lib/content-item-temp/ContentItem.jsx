import React from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes } from 'constants/slideViewTypes';

import LiveViewFactory from './content-item-view-factories/LiveViewFactory';
import ContentViewFactory from './content-item-view-factories/ContentViewFactory';
import NavigationViewFactory from './content-item-view-factories/NavigationViewFactory';

import addContentItemTypeProps from './helpers/addContentItemTypeProps';

function ContentItem(props) {
  const { slideViewType, contentItem: { contentItemType } } = props;

  const contentItemTypeProps = addContentItemTypeProps(contentItemType);

  switch (slideViewType) {
    case slideViewTypes.LIVE:
      return <LiveViewFactory {...props} {...contentItemTypeProps} />;

    case slideViewTypes.CONTENT:
      return <ContentViewFactory {...props} {...contentItemTypeProps} />;

    case slideViewTypes.NAVIGATION:
      return <NavigationViewFactory {...props} {...contentItemTypeProps} />;
    default:
      throw new Error('Unsupported view type');
  }
}

ContentItem.propTypes = {
  slideViewType: PropTypes.string.isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

export default ContentItem;
