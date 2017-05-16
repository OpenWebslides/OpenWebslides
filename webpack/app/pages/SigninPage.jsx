import React from 'react';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import EmailSigninForm from 'containers/EmailSigninForm';
import OauthLinks from 'presentationals/OauthLinks';

function SigninPage({ t }) {
  return (
    <div>
      <EmailSigninForm />
      <Link to="/forgot_password">{t('forgotPassword')}</Link>
      <OauthLinks />
    </div>
  );
}

SigninPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(SigninPage);
