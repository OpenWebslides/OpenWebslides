import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import SignupContainer from 'containers/SignupContainer';
import OauthLinks from 'presentationals/components/oauth/OauthLinks';

function SignupPage() {
  return (
    <DefaultLayout
      cssIdentifier="signup"
      components={{
        signup: (
          <div>
            <SignupContainer />
            <OauthLinks />
          </div>
        ),
      }}
    />
  );
}

export default SignupPage;
