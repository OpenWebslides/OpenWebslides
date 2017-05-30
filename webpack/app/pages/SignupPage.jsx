import React from 'react';

import SignupForm from 'containers/SignupForm';
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
