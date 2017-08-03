import React from 'react';
import PropTypes from 'prop-types';

export default function ListItem(props) {
  const { children, attributes } = props;

  return (
    <li {...attributes}>
      {children}
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
};
