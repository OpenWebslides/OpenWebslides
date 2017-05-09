import React from 'react';

import EmailConfirmation from 'containers/ConfirmEmailContainer';

function emailConfirmationPage(props) {
  return (
    <div>
      <EmailConfirmation {...props} />
    </div>
  );
}

export default emailConfirmationPage;
