import React from 'react';
import PropTypes from 'prop-types';

import { asideContentItemShape } from 'constants/propTypeShapes';

export default function Aside(props) {
  const { children, attributes } = props;

  return (
    <aside {...attributes} >
      {children}
    </aside>
  );
}

Aside.propTypes = {
  contentItem: PropTypes.shape(asideContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};
