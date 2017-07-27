import React from 'react';

import ContentEditableContainer
  from 'lib/content-editable/ContentEditableContainer';

export default function Title(props) {
  let content;

  if (props.editable) {
    content = (
      <ContentEditableContainer
        contentItem={props.contentItem}
        handleKeyDown={props.handleKeyDown}
        slideViewType={props.slideViewType}
        isFocused={props.isFocused}
        textPropName="text"
        hasInlineProperties={true}
      />
    );
  }
  else {
    content = (
      <p>{props.contentItem.text}</p>
    );
  }

  return content;
}
