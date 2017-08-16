import React from 'react';
import PropTypes from 'prop-types';

export default function ListItem({ children, attributes }) {
  return (
    <li {...attributes} >
      {children}
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  attributes: PropTypes.objectOf(Object).isRequired,
};

ListItem.defaultProps = {
  children: '',
};
