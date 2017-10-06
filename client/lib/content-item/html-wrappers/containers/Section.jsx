import React from 'react';
import PropTypes from 'prop-types';

import { sectionContentItemShape } from 'constants/propTypeShapes';

export default function Section(props) {
  const { children, attributes } = props;

  return (
    <section {...attributes} >
      {children}
    </section>
  );
}

Section.propTypes = {
  contentItem: PropTypes.shape(sectionContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};
