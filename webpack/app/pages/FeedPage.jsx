import React from 'react';

import PageHeader from 'presentationals/PageHeader';
import FeedContainer from 'containers/FeedContainer';

function FeedPage() {
  return (
    <div className="l_page l_page--feed">
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
                <div className="l_main__item l_main__item--feed-container">
                  <div className="l_main__item__wrapper">
                    <FeedContainer />
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

export default FeedPage;
