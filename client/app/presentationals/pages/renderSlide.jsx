import React from 'react';
import SlideEditor from './SlideEditor';

export default function renderSlide(slide) {
  const contentArr = [];

  slide.content.forEach(content => {
    const { id, type, childContent } = content;
    if (type === 'contentGroup') {
      const groupedContent = renderSlide(childContent);
      const GroupComponent = React.createElement(
        'section',
        { id },
        groupedContent,
      );
      contentArr.push(GroupComponent);
    } else {
      const EditorComponent = React.createElement(SlideEditor, { id });
      contentArr.push(EditorComponent);
    }
  });
  return contentArr;
}
