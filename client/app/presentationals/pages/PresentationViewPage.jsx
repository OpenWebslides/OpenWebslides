import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PresentationViewContainer from 'containers/presentation-view/PresentationViewContainer';

function PresentationPage(props) {
  const { isAuthenticated } = props;

  if (!(isAuthenticated)) {
    window.location.replace('/auth/cas');
  }

  return (
    <PresentationViewContainer {...props} />
  );
}

export default connect(
  (state) => {
    return { isAuthenticated: state.app.authentication.isAuthenticated };
  },
)(PresentationPage);

PresentationPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

