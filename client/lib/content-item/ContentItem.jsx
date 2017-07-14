import React from 'react';
import PropTypes from 'prop-types';

import contentBlockConfigMap from 'lib/content-block-configs';

export default function ContentBlockEditor(props) {
  const { contentItem } = props;

  const ContentBlockType = contentBlockConfigMap[contentItem.contentType];

  return <ContentBlockType {...props} />;
}

ContentBlockEditor.propTypes = {
  contentItem: PropTypes.ObjectOf(Object).isRequired,
};
