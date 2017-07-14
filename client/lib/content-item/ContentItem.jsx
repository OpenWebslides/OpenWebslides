import React from 'react';
import PropTypes from 'prop-types';

import contentBlockConfigMap from 'lib/content-block-configs';

export default function ContentItem(props) {
  const { contentItem } = props;

  const ContentBlockType = contentBlockConfigMap[contentItem.contentItemType];

  return <ContentBlockType {...props} />;
}

ContentItem.propTypes = {
  contentItem: PropTypes.objectOf(Object).isRequired,
};
