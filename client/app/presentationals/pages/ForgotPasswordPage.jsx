import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import ForgotPasswordContainer from 'containers/ForgotPasswordContainer';

function ForgotPasswordPage(props) {
  return (
    <DefaultLayout
      cssIdentifier="forgot-password"
      components={{
        'forgot-password': <ForgotPasswordContainer {...props} />,
      }}
    />
  );
}

export default ForgotPasswordPage;
