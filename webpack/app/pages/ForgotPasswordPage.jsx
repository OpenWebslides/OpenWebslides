import React from 'react';

import ForgotPasswordForm from 'containers/ForgotPasswordForm';

function requestResetPasswordPage(props) {
  return (
    <div>
      <ForgotPasswordForm {...props} />
    </div>
  );
}

export default requestResetPasswordPage;
