import React from 'react';
import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function Title(props) {
  return (
    <h1>
      <ContentEditableContainer {...props} />
    </h1>
  );
}
