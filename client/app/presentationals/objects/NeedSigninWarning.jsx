import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NeedSigninWarning({ requestedAction }) {
  return (
    <div className="c_sign-in-warning">
      <p> You need to be signed in to {requestedAction}. </p>
      <a href="/auth/cas"> Sign in with UGent CAS </a> or <Link className="c_nav-menu__link" to={'/signin'}>sign in with guest account</Link>
    </div>
  );
}

NeedSigninWarning.propTypes = {
  requestedAction: PropTypes.string,
};

NeedSigninWarning.defaultProps = {
  requestedAction: 'do this',
};

export default NeedSigninWarning;
