import React from 'react';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function Title(props) {
  const TitleTag = `h${props.headingLevel}`;

  if (props.editable) {
    return (
      <TitleTag>
        <ContentEditableContainer contentItem={props.contentItem} />
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
