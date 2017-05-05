import React from 'react';
import { Link } from 'react-router';

import EmailSigninForm from 'containers/emailSigninForm';
import ExternalAuthLinks from 'presentationals/externalAuthLinks';

function signinPage() {
  return (
    <div>
      <EmailSigninForm />
      <Link to="/reset_password">Forgot Password?</Link>
      <ExternalAuthLinks />
    </div>
  );
}

export default signinPage;
