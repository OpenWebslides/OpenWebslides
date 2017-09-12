import React from 'react';

import FullViewportLayout from 'presentationals/layouts/FullViewportLayout';
import SlideEditorContainer from 'containers/slide-editor/SlideEditorContainer';

function SlideEditorPage(props) {
  return (
    <FullViewportLayout cssIdentifier="slide-editor">
      <SlideEditorContainer {...props} />
    </FullViewportLayout>
  );
}

export default SlideEditorPage;
