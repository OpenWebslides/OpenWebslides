import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';

function SigninPage({ t }) {
  return (
    <div>
      <h1>{t('appName')}</h1>
      <Link to="/signin">{t('signin:signin')}</Link>
    </div>
  );
}

SigninPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(SigninPage);
