import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import DeckNavigationPane
  from 'presentationals/components/editor/DeckNavigationPane';
import SlideEditingPane
  from 'presentationals/components/editor/SlideEditingPane';

function SlideEditorPage() {
  return (
    <DefaultLayout
      cssIdentifier="slide-editor"
      components={{
        'deck-navigator': <DeckNavigationPane />,
        'slide-editor': <SlideEditingPane />,
      }}
    />
  );
}

export default SlideEditorPage;
