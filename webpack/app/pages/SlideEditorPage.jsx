import React from 'react';

import PageHeader from '../presentationals/PageHeader';
import DeckNavigator from '../presentationals/DeckNavigator';
import SlideEditor from '../presentationals/SlideEditor';

function SlideEditorPage() {
  return (
    <div className="l_page l_page--slide-editor">
      <div className="l_page__wrapper">
        <div className="l_page__item l_page__item--header">
          <PageHeader />
        </div>
        <div className="l_page__item l_page__item--main">
          <main className="l_main">
            <div className="l_main__wrapper">
              <div className="l_main__item l_main__item--deck-navigator">
                <DeckNavigator />
              </div>
              <div className="l_main__item l_main__item--slide-editor">
                <SlideEditor />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SlideEditorPage;
