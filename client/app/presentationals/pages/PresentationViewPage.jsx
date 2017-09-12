import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PresentationViewContainer from 'containers/presentation-view/PresentationViewContainer';
import SigninPage from './SigninPage';

function PresentationPage(props) {
  const { isAuthenticated } = props;

  if (isAuthenticated) {
    return (
      <PresentationViewContainer {...props} />
    );
  }

  return <SigninPage />;
}

export default connect(
  (state) => {
    return { isAuthenticated: state.app.authentication.isAuthenticated };
  },
)(PresentationPage);

PresentationPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

