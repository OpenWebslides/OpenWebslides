import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import EmailConfirmation from 'containers/EmailConfirmationContainer';

function ConfirmEmailPage(props) {
  return (
    <DefaultLayout
      cssIdentifier="confirm-email"
      components={{
        'confirm-email': <EmailConfirmation {...props} />,
      }}
    />
  );
}

export default ConfirmEmailPage;
