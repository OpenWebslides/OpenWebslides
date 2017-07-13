import React from 'react';
import PropTypes from 'prop-types';

import contentBlockConfigMap from 'lib/content-block-configs';

export default function ContentBlockEditor(props) {
  const ContentBlockType = contentBlockConfigMap[props.contentType];

  return <ContentBlockType {...props} />;
}

ContentBlockEditor.propTypes = {
  contentType: PropTypes.string.isRequired,
};
