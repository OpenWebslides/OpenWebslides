import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

function NeedSigninWarning({ requestedAction }) {
  return (
    <div className="c_sign-in-warning">
      <p> You need to be signed in to {requestedAction}. </p>
      <Link to={'/signin'}> Sign in here </Link>
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
