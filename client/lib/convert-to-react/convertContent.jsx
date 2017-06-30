import React from 'react';

import ContentBlockReadOnlyContainer from 'lib/convert-to-react/content-block-read-only/ContentBlockReadOnlyContainer';
import ContentBlockEditorContainer from 'lib/convert-to-react/content-block-editor/ContentBlockEditorContainer';

export default function convertContent(content, { active }) {
  const contentArr = [];

  content.forEach(contentElement => {
    const { id, type, childContent } = contentElement;

    if (type === 'contentGroup') {
      const groupedContent = convertContent(childContent, { active });

      const GroupComponent = (
        <section key={id} id={id}>
          {groupedContent}
        </section>
      );

      contentArr.push(GroupComponent);
    } else if (active) {
      const EditorComponent = <ContentBlockEditorContainer key={id} id={id} />;

      contentArr.push(EditorComponent);
    } else {
      const EditorComponent = (
        <ContentBlockReadOnlyContainer key={id} id={id} />
      );

      contentArr.push(EditorComponent);
    }
  });

  return contentArr;
}
