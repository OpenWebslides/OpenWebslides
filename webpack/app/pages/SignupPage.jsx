import React from 'react';

import SignupForm from 'containers/signupForm';
import OauthLinks from 'presentationals/OauthLinks';

function SignupPage() {
  return (
    <div>
      <SignupForm />
      <OauthLinks />
    </div>
  );
}

export default SignupPage;
