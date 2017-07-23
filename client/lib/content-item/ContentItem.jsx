import React from 'react';
import PropTypes from 'prop-types';

import { contentItemTypesById } from 'constants/contentItemTypes';

function ContentItem(props) {
  const { contentItem } = props;
  const ContentItemType = contentItemTypesById[contentItem.contentItemType].component;
  return <ContentItemType {...props} />;
}

ContentItem.propTypes = {
  contentItem: PropTypes.object.isRequired,
  headingLevel: PropTypes.number.isRequired,
  editable: PropTypes.bool,
  handleKeyDown: PropTypes.func.isRequired,
};

ContentItem.defaultProps = {
  editable: false,
};

export default ContentItem;