import React from 'react';
import PropTypes from 'prop-types';

export default function List({ children, attributes, ordered }) {
  const ListType = ordered ? 'ol' : 'ul';

  return (
    <ListType {...attributes} >
      {children}
    </ListType>
  );
}

List.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
  contentItem: PropTypes.objectOf(Object).isRequired,
};
