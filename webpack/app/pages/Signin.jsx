import React from 'react';
import { Link } from 'react-router';

import EmailSigninForm from 'containers/EmailSigninForm';
import OauthLinks from 'presentationals/OauthLinks';

function signinPage() {
  return (
    <div>
      <EmailSigninForm />
      <Link to="/reset_password">Forgot Password?</Link>
      <OauthLinks />
    </div>
  );
}

export default signinPage;
