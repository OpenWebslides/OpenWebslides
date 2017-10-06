import React from 'react';
import PropTypes from 'prop-types';

import { listContentItemShape } from 'constants/propTypeShapes';

export default function List(props) {
  const { children, attributes, contentItem: { ordered } } = props;
  const ListType = ordered ? 'ol' : 'ul';

  return (
    <ListType {...attributes} >
      {children}
    </ListType>
  );
}

List.propTypes = {
  contentItem: PropTypes.shape(listContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};
