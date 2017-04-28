import React from 'react';

import SigninForm from 'containers/signinForm';

function successMessage() {
  return (
    <div>
      <h3>Your email was successfully confirmed! You can nog sign in:</h3>
      <SigninForm />
    </div>
  );
}

export default successMessage;
