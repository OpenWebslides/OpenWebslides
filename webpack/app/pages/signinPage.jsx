import React from 'react';
import { Link } from 'react-router';

import SigninForm from 'containers/signinForm';

function signinPage() {
  return (
    <div>
      <SigninForm />
      <Link to="/reset_password">Forgot Password?</Link>
    </div>
  );
}

export default signinPage;
