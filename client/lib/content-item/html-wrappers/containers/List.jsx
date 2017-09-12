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
  children: PropTypes.oneOfType([PropTypes.arrayOf(Object), PropTypes.objectOf(Object)]).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
  ordered: PropTypes.bool.isRequired,
};
