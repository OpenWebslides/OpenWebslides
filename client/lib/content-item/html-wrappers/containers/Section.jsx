import React from 'react';
import PropTypes from 'prop-types';

export default function Section({ children, attributes }) {
  return (
    <section {...attributes} >
      {children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(Object), PropTypes.objectOf(Object)]).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
};
