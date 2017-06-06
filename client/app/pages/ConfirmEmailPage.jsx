import React from 'react';

import PageHeader from 'presentationals/PageHeader';
import EmailConfirmation from 'containers/ConfirmEmailContainer';

function ConfirmEmailPage(props) {
  return (
    <div className="l_page l_page--confirm-email">
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
                <div className="l_main__item l_main__item--confirm-email">
                  <div className="l_main__item__wrapper">
                    <EmailConfirmation {...props} />
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

export default ConfirmEmailPage;
