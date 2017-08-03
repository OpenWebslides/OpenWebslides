import React from 'react';
import PropTypes from 'prop-types';

export default function Paragraph(props) {
  const { children, attributes } = props;

  return (
    <p {...attributes}>
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
};
