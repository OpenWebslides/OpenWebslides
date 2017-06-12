import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import DeckNavigator from 'presentationals/components/editor/NavigationPane';
import SlideEditor from 'presentationals/components/editor/EditingPane';

function SlideEditorPage() {
  return (
    <DefaultLayout
      cssIdentifier="slide-editor"
      components={{
        'deck-navigator': DeckNavigator,
        'slide-editor': SlideEditor,
      }}
    />
  );
}

export default SlideEditorPage;
