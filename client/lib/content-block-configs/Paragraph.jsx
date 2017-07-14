import React from 'react';
import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function Paragraph(props) {
  return (
    <p>
      <ContentEditableContainer {...props} />
    </p>
  );
}
