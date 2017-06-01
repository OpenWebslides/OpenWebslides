import React from 'react';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import PageHeader from 'presentationals/PageHeader';
import EmailSigninForm from 'containers/EmailSigninForm';
import OauthLinks from 'presentationals/OauthLinks';

function SigninPage({ t }) {
  return (
    <div className="l_page l_page--signin">
      <div className="l_page__wrapper">
        <div className="l_page__item l_page__item--header">
          <div className="l_page__item__wrapper">
            <PageHeader />
          </div>
        </div>
        <div className="l_page__item l_page__item--main">
          <div className="l_page__item__wrapper">
            <main className="l_main">
              <div className="l_main__wrapper">
                <div className="l_main__item l_main__item--signin">
                  <div className="l_main__item__wrapper">
                    <EmailSigninForm />
                    <Link to="/forgot_password">{t('forgotPassword')}</Link>
                    <OauthLinks />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

SigninPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(SigninPage);
