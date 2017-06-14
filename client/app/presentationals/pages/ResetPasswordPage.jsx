import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import ResetPasswordContainer from 'containers/ResetPasswordContainer';

function ResetPasswordPage(props) {
  return (
    <DefaultLayout
      cssIdentifier="reset-password"
      components={{
        'reset-password': <ResetPasswordContainer {...props} />,
      }}
    />
  );
}

export default ResetPasswordPage;
