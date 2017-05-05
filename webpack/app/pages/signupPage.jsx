import React from 'react';

import SignupForm from 'containers/signupForm';
import ExternalAuthLinks from 'presentationals/externalAuthLinks';


function signupPage() {
  return (
    <div>
      <SignupForm />
      <ExternalAuthLinks />
    </div>
  );
}

export default signupPage;
