import React from 'react';
import PropTypes from 'prop-types';

export default function Paragraph({ children, attributes }) {
  return (
    <p {...attributes} >
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  attributes: PropTypes.objectOf(Object).isRequired,
};

Paragraph.defaultProps = {
  children: '',
};
