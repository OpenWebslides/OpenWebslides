import React from 'react';
import PropTypes from 'prop-types';

import { listItemContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents
  from 'lib/content-item-container/content-item-contents/ContentItemInnerContents';

function ListItemDisplayWrapper(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <li
      className="ows_list-item"
      {...attributes}
    >
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

ListItemDisplayWrapper.propTypes = {
  contentItem: PropTypes.shape(listItemContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ListItemDisplayWrapper;
