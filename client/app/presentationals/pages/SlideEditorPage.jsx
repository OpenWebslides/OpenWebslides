import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import Editor from 'containers/slide-editor/EditorContainer';

function SlideEditorPage() {
  return (
    <DefaultLayout
      cssIdentifier="slide-editor"
      components={{
        editor: <Editor />,
      }}
    />
  );
}

export default SlideEditorPage;
