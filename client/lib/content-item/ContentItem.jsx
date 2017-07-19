import React from 'react';
import PropTypes from 'prop-types';

import { contentItemTypesById } from 'constants/contentItemTypes';

export default function ContentItem(props) {
  const { contentItem } = props;
  const ContentItemType = contentItemTypesById[contentItem.contentItemType].component;
  return <ContentItemType {...props} />;
}

ContentItem.propTypes = {
  contentItem: PropTypes.object.isRequired,
};
