import React from 'react';

import FullViewportLayout from 'presentationals/layouts/FullViewportLayout';
import SlideEditorContainer from 'containers/slide-editor/SlideEditorContainer';

function SlideEditorPage() {
  return (
    <FullViewportLayout cssIdentifier="slide-editor">
      <SlideEditorContainer />
    </FullViewportLayout>
  );
}

export default SlideEditorPage;
