import React from 'react';

import EmailSigninContainer from 'containers/EmailSigninContainer';

function successMessage() {
  return (
    <div>
      <h3>Your email was successfully confirmed! You can nog sign in:</h3>
      <EmailSigninContainer />
    </div>
  );
}

export default successMessage;
