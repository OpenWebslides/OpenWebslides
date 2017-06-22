import React from 'react';

import ReadOnlyContentBlockContainer from 'lib/convert-to-react/containers/ReadOnlyContentBlockContainer';
import EditableContentBlockContainer from 'lib/convert-to-react/containers/EditableContentBlockContainer';

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
      const EditorComponent = (
        <EditableContentBlockContainer key={id} id={id} />
      );

      contentArr.push(EditorComponent);
    } else {
      const EditorComponent = (
        <ReadOnlyContentBlockContainer key={id} id={id} />
      );

      contentArr.push(EditorComponent);
    }
  });

  return contentArr;
}
