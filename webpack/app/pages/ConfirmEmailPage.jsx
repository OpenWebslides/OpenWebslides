import React from 'react';

import EmailConfirmation from 'containers/ConfirmEmailContainer';

function EmailConfirmationPage(props) {
  return (
    <div>
      <EmailConfirmation {...props} />
    </div>
  );
}

export default EmailConfirmationPage;
