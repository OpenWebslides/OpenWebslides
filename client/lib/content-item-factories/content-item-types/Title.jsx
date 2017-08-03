import React from 'react';
import PropTypes from 'prop-types';

export default function Title(props) {
  const { headingLevel, attributes, children } = props;

  const Heading = `h${headingLevel <= 6 ? headingLevel : 6}`;

  return (
    <Heading {...attributes}>
      {children}
    </Heading>
  );
}

Title.propTypes = {
  headingLevel: PropTypes.number.isRequired,
  children: PropTypes.objectOf(Object).isRequired,
  attributes: PropTypes.objectOf(Object).isRequired,
};
