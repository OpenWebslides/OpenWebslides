import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ headingLevel, attributes, children }) {
  const Heading = `h${headingLevel <= 6 ? headingLevel : 6}`;

  return (
    <Heading {...attributes} >
      {children}
    </Heading>
  );
}

Title.propTypes = {
  headingLevel: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  attributes: PropTypes.objectOf(Object).isRequired,
};

Title.defaultProps = {
  children: '',
};
