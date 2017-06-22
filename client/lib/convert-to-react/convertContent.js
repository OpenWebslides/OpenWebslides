import React from 'react';
import ReadOnlyEditor from 'lib/convert-to-react/ReadOnlyEditor';
import ActiveContentBlockEditor from 'lib/convert-to-react/ActiveEditor';

export default function convertContent(content, { active }) {
  const contentArr = [];
  content.forEach(contentElement => {
    const { id, type, childContent } = contentElement;
    if (type === 'contentGroup') {
      const groupedContent = convertContent(childContent, { active });

      const GroupComponent = React.createElement(
        'section',
        { id },
        groupedContent,
      );
      contentArr.push(GroupComponent);
    } else if (active) {
      const EditorComponent = React.createElement(ActiveContentBlockEditor, {
        key: id,
        id,
      });
      contentArr.push(EditorComponent);
    } else {
      const EditorComponent = React.createElement(ReadOnlyEditor, {
        key: id,
        id,
      });
      contentArr.push(EditorComponent);
    }
  });
  return contentArr;
}
