import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import EmailSigninForm from 'containers/EmailSigninContainer';
import OauthLinks from 'presentationals/components/oauth/OauthLinks';

function SigninPage() {
  return (
    <DefaultLayout
      cssIdentifier="signin"
      components={{
        signin: (
          <div>
            <EmailSigninForm />
            <OauthLinks />
          </div>
        ),
      }}
    />
  );
}

SigninPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(SigninPage);
