import React from 'react';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function Title(props) {
  const TitleTag = `h${props.headingLevel <= 6 ? props.headingLevel : 6}`;

  if (props.editable) {
    return (
      <TitleTag>
        <ContentEditableContainer contentItem={props.contentItem} handleKeyDown={props.handleKeyDown} />
      </TitleTag>
    );
  } else {
    return (
      <TitleTag
        dangerouslySetInnerHTML={{
          __html: getHTMLStringFromInlinePropertiesAndText(props.contentItem.inlineProperties, props.contentItem.text),
        }}
      />
    );
  }
}
