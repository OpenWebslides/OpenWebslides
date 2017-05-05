import React from 'react';

import RequestResetPasswordForm from 'containers/resetPassword/requestResetPasswordForm';

function requestResetPasswordPage(props) {
  return (
    <div>
      <RequestResetPasswordForm {...props} />
    </div>
  );
}

export default requestResetPasswordPage;
