import React from 'react';

import PageHeader from 'presentationals/components/PageHeader';
import SignupForm from 'containers/SignupForm';
import OauthLinks from 'presentationals/components/OauthLinks';

function SignupPage() {
  return (
    <div className="l_page l_page--signup">
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
                <div className="l_main__item l_main__item--signup">
                  <div className="l_main__item__wrapper">
                    <SignupForm />
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

export default SignupPage;
