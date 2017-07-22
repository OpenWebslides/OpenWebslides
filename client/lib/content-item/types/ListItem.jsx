import React from 'react';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function ListItem(props) {
  if (props.editable) {
    return (
      <li>
        <ContentEditableContainer contentItem={props.contentItem} />
      </li>
    );
  }
  return (
    <li
      dangerouslySetInnerHTML={{
        __html: getHTMLStringFromInlinePropertiesAndText(props.contentItem.inlineProperties, props.contentItem.text),
      }}
    />
  );
}

