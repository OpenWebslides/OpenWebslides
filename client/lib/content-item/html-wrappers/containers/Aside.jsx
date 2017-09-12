import React from 'react';
import PropTypes from 'prop-types';

export default function Aside({ children, attributes }) {
  return (
    <aside {...attributes} >
      {children}
    </aside>
  );
}

Aside.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(Object), PropTypes.objectOf(Object)]).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
};
