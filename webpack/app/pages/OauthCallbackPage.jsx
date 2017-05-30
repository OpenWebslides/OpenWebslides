import React from 'react';

import OAuthCallback from 'containers/OauthCallbackContainer';

function OauthCallbackPage(props) {
  return (
    <div>
      <OAuthCallback {...props} />
    </div>
  );
}

export default OauthCallbackPage;
