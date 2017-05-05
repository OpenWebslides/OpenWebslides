import React from 'react';

import EmailSigninForm from 'containers/emailSigninForm';

function successMessage() {
  return (
    <div>
      <h3>Your email was successfully confirmed! You can nog sign in:</h3>
      <EmailSigninForm />
    </div>
  );
}

export default successMessage;
