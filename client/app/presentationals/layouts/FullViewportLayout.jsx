import React from 'react';
import PropTypes from 'prop-types';

import DefaultLayout from './DefaultLayout';

function FullViewportLayout(props) {
  return <DefaultLayout {...props} />;
}

FullViewportLayout.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.element),
  layoutIdentifier: PropTypes.string.isRequired,
};

FullViewportLayout.defaultProps = {
  children: null,
  components: {},
  layoutIdentifier: 'full-viewport',
};

export default FullViewportLayout;
