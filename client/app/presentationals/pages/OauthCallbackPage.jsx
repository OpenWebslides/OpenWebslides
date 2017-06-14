import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import OauthCallback from 'containers/OauthCallbackContainer';

function OauthCallbackPage(props) {
  return (
    <DefaultLayout
      cssIdentifier="oauth-callback"
      components={{
        'oath-callback': <OauthCallback {...props} />,
      }}
    />
  );
}

export default OauthCallbackPage;
