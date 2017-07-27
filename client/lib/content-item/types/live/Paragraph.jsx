import React from 'react';

import {
  getHTMLStringFromInlinePropertiesAndText,
} from 'lib/content-editable/inlineProperties';

import ContentEditableContainer
  from 'lib/content-editable/ContentEditableContainer';

export default function Paragraph(props) {
  if (props.editable) {
    return (
      <p {...props.attributes}>
        <ContentEditableContainer
          contentItem={props.contentItem}
          handleKeyDown={props.handleKeyDown}
          slideViewType={props.slideViewType}
          isFocused={props.isFocused}
          textPropName="text"
          hasInlineProperties={true}
        />
      </p>
    );
  }
  return (
    <p
      {...props.attributes}
      dangerouslySetInnerHTML={{
        __html: getHTMLStringFromInlinePropertiesAndText(
          props.contentItem.inlineProperties,
          props.contentItem.text,
        ),
      }}
    />
  );
}
