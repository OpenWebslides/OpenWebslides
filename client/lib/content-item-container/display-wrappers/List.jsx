import React from 'react';
import PropTypes from 'prop-types';

import { listContentItemShape } from 'constants/propTypeShapes';

import ContainerContentItemChildren from '../content-item-contents/ContainerContentItemChildren';

function List(props) {
  const { contentItem, attributes, ...passThroughProps } = props;
  const ListElement = (contentItem.ordered) ? 'ol' : 'ul';

  return (
    <ListElement {...attributes} >
      <ContainerContentItemChildren
        contentItem={contentItem}
        {...passThroughProps}
      />
    </ListElement>
  );
}

List.propTypes = {
  contentItem: PropTypes.shape(listContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default List;
