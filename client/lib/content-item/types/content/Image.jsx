import React from 'react';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function Image(props) {
  let content;

  if (props.editable) {
    content = (
      <ContentEditableContainer
        contentItem={props.contentItem}
        handleKeyDown={props.handleKeyDown}
        slideViewType={props.slideViewType}
        isFocused={props.isFocused}
        textPropName="src"
        hasInlineProperties={false}
      />
    );
  } else {
    content = (
      <p>{props.contentItem.src}</p>
    );
  }

  return content;
}
