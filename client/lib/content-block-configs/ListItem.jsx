import React from 'react';
import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function ListItem(props) {
  return (
    <li>
      <ContentEditableContainer {...props} />
    </li>
  );
}
