import React from 'react';
import PropTypes from 'prop-types';

import { listItemContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents from '../content-item-contents/ContentItemInnerContents';

function ListItem(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <li {...attributes}>
      <ContentItemInnerContents
        contentItem={contentItem}
        {...passThroughProps}
        textPropOptions={[{
          textPropTitle: '',
          textPropName: 'text',
          hasInlineProperties: true,
          deleteOnBackspace: true,
        }]}
      />
    </li>
  );
}

ListItem.propTypes = {
  contentItem: PropTypes.shape(listItemContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ListItem;
