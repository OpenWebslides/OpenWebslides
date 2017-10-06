import React from 'react';
import PropTypes from 'prop-types';

import { titleContentItemShape } from 'constants/propTypeShapes';

export default function Title(props) {
  const { headingLevel, attributes, children } = props;
  const Heading = `h${headingLevel <= 6 ? headingLevel : 6}`;

  return (
    <Heading {...attributes} >
      {children}
    </Heading>
  );
}

Title.propTypes = {
  contentItem: PropTypes.shape(titleContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  headingLevel: PropTypes.number.isRequired,
};

Title.defaultProps = {
  children: '',
};
