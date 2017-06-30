import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import SlideEditorContainer from 'containers/slide-editor/SlideEditorContainer';

function SlideEditorPage() {
  return (
    <DefaultLayout cssIdentifier="slide-editor">
      <SlideEditorContainer />
    </DefaultLayout>
  );
}

export default SlideEditorPage;
