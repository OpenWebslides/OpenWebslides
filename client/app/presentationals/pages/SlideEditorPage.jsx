import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import NavigationPane from 'presentationals/components/editor/NavigationPane';
import EditingPane from 'presentationals/components/editor/EditingPane';

function SlideEditorPage() {
  return (
    <DefaultLayout
      cssIdentifier="slide-editor"
      components={{
        'deck-navigator': <NavigationPane />,
        'slide-editor': <EditingPane />,
      }}
    />
  );
}

export default SlideEditorPage;
