import React from 'react';

import OAuthCallback from 'containers/OauthCallback';

function oauthCallbackPage(props) {
  return (
    <div>
      <OAuthCallback {...props} />
    </div>
  );
}

export default oauthCallbackPage;
