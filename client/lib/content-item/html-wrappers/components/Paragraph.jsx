import React from 'react';
import PropTypes from 'prop-types';

import { paragraphContentItemShape } from 'constants/propTypeShapes';

export default function Paragraph(props) {
  const { children, attributes } = props;

  return (
    <p {...attributes} >
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  contentItem: PropTypes.shape(paragraphContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Paragraph.defaultProps = {
  children: '',
};
