import React from 'react';
import PropTypes from 'prop-types';

import { listContentItemShape } from 'constants/propTypeShapes';

import ContainerContentItemChildren
  from 'lib/content-item-container/content-item-contents/ContainerContentItemChildren';

function ListDisplayWrapper(props) {
  const { contentItem, attributes, ...passThroughProps } = props;
  const ListElement = (contentItem.ordered) ? 'ol' : 'ul';

  return (
    <ListElement
      className="ows_list"
      {...attributes}
    >
      <ContainerContentItemChildren
        contentItem={contentItem}
        {...passThroughProps}
      />
    </ListElement>
  );
}

ListDisplayWrapper.propTypes = {
  contentItem: PropTypes.shape(listContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ListDisplayWrapper;
