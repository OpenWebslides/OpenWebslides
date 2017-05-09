import React from 'react';

import SignupForm from 'containers/SignupForm';
import OauthLinks from 'presentationals/OauthLinks';

function signupPage() {
  return (
    <div>
      <SignupForm />
      <OauthLinks />
    </div>
  );
}

export default signupPage;
